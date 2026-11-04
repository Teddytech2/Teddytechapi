(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const state = { groups: [], category: 'all', query: '', active: null };
  const groupsEl = $('#endpoint-groups');
  const tabsEl = $('#category-tabs');
  const modal = $('#request-modal');
  const toastEl = $('#toast');
  let toastTimer;

  function toast(message) {
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2100);
  }

  function safeText(value) { return String(value ?? ''); }
  function escapeHtml(value) {
    return safeText(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  }
  function normalizeGroups(payload) {
    const groups = Array.isArray(payload?.endpoints) ? payload.endpoints : [];
    return groups.map(group => ({
      name: safeText(group.name || 'Other'),
      items: (Array.isArray(group.items) ? group.items : []).map(entry => {
        const name = Object.keys(entry || {})[0];
        if (!name) return null;
        const value = entry[name] || {};
        const path = safeText(value.path || '');
        let params = Array.isArray(value.params) ? value.params : [];
        if (!params.length && path.includes('?')) {
          params = path.split('?')[1].split('&').filter(Boolean).map(part => {
            const [rawName] = part.split('=');
            const optional = rawName.startsWith('_');
            return { name: decodeURIComponent(rawName.replace(/^_/, '')), required: !optional && rawName.toLowerCase() !== 'sessionid' };
          });
        }
        return {
          name,
          groupName: safeText(group.name || 'Other'),
          desc: value.desc || value.description || '',
          path: path.split('?')[0],
          params: params.map(param => ({ name: safeText(param.name || param.key), required: param.required !== false, description: param.description || '' })).filter(param => param.name),
          methods: Array.isArray(value.methods) ? value.methods : [value.method || 'GET'],
          provider: value.provider || 'TEDDY-TECH'
        };
      }).filter(Boolean)
    })).filter(group => group.items.length);
  }

  function renderTabs() {
    const categories = ['all', ...state.groups.map(group => group.name)];
    tabsEl.innerHTML = categories.map(category => `<button class="category-tab ${state.category === category ? 'active' : ''}" data-category="${escapeHtml(category)}">${category === 'all' ? 'All endpoints' : escapeHtml(category)}</button>`).join('');
    tabsEl.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
      state.category = button.dataset.category;
      renderTabs();
      renderGroups();
    }));
  }

  function visibleGroups() {
    const query = state.query.toLowerCase().trim();
    return state.groups.filter(group => state.category === 'all' || group.name === state.category).map(group => ({
      ...group,
      items: group.items.filter(item => !query || [group.name, item.name, item.desc, item.path, item.provider].join(' ').toLowerCase().includes(query))
    })).filter(group => group.items.length);
  }

  function renderGroups() {
    const groups = visibleGroups();
    const count = groups.reduce((total, group) => total + group.items.length, 0);
    $('#results-count').textContent = `${count} endpoint${count === 1 ? '' : 's'} found`;
    $('#empty-state').hidden = count !== 0;
    groupsEl.innerHTML = '';
    groupsEl.hidden = count === 0;
    groups.forEach(group => {
      const section = document.createElement('section');
      section.className = 'endpoint-group';
      const heading = document.createElement('div');
      heading.className = 'category-heading';
      heading.innerHTML = `<h3>${escapeHtml(group.name)}</h3><span class="category-count">${group.items.length} ROUTES</span>`;
      const grid = document.createElement('div');
      grid.className = 'endpoint-grid';
      group.items.forEach(item => {
        const card = document.createElement('article');
        card.className = 'endpoint-card';
        const methods = item.methods.map(method => `<span class="method-tag">${escapeHtml(method)}</span>`).join('');
        const route = item.path + (item.params.length ? '?' + item.params.map(param => `${param.required ? '' : '_'}${encodeURIComponent(param.name)}=`).join('&') : '');
        card.innerHTML = `<div class="endpoint-card-top"><div class="endpoint-title">${escapeHtml(item.name)}</div><div class="method-tags">${methods}</div></div><p class="endpoint-desc">${escapeHtml(item.desc || 'No description provided.')}</p><code class="endpoint-path">${escapeHtml(route)}</code><div class="endpoint-card-bottom"><span class="provider-label">${escapeHtml(item.provider.toUpperCase())}</span><div class="card-actions"><button class="mini-btn copy-endpoint" type="button">Copy</button><button class="mini-btn try-btn" type="button">Try endpoint →</button></div></div>`;
        card.querySelector('.copy-endpoint').addEventListener('click', () => copyText(new URL(item.path, location.origin).href));
        card.querySelector('.try-btn').addEventListener('click', () => openModal(item));
        grid.appendChild(card);
      });
      section.append(heading, grid);
      groupsEl.appendChild(section);
    });
  }

  async function loadCatalogue(force = false) {
    const status = $('#catalogue-status');
    const refreshButton = $('#refresh-btn');
    status.textContent = force ? 'Refreshing catalogue…' : 'Syncing live catalogue…';
    refreshButton.disabled = true;
    refreshButton.innerHTML = '<span class="refresh-icon">↻</span> Refreshing…';
    try {
      const url = force ? '/endpoints?refresh=1&_=' + Date.now() : '/endpoints?_=' + Date.now();
      const response = await fetch(url, { cache: 'no-store', headers: { 'Cache-Control': 'no-cache' } });
      if (!response.ok) throw new Error(`Catalogue request failed (${response.status})`);
      const payload = await response.json();
      if (payload.status === false) throw new Error(payload.message || 'Catalogue unavailable');
      state.groups = normalizeGroups(payload);
      $('#stat-total').textContent = Number(payload.count ?? state.groups.reduce((n, group) => n + group.items.length, 0)).toLocaleString();
      $('#stat-categories').textContent = state.groups.length.toLocaleString();
      $('#updated-at').textContent = payload.updatedAt ? `UPDATED ${new Date(payload.updatedAt).toLocaleTimeString()}` : 'LIVE CATALOGUE';
      status.textContent = `Live catalogue · ${state.groups.reduce((n, group) => n + group.items.length, 0)} routes`;
      renderTabs();
      renderGroups();
    } catch (error) {
      status.textContent = 'Catalogue refresh failed';
      if (!state.groups.length) groupsEl.innerHTML = `<div class="loading-state">${escapeHtml(error.message)}. Please try refreshing.</div>`;
      toast(error.message || 'Could not load endpoints');
    } finally {
      refreshButton.disabled = false;
      refreshButton.innerHTML = '<span class="refresh-icon">↻</span> Refresh catalogue';
    }
  }

  function openModal(item) {
    state.active = item;
    $('#modal-title').textContent = item.name;
    $('#modal-description').textContent = item.desc || 'Send a request to this endpoint and inspect the response.';
    $('#request-path').textContent = item.path;
    const methodSelect = $('#request-method');
    methodSelect.innerHTML = item.methods.map(method => `<option value="${escapeHtml(method)}">${escapeHtml(method)}</option>`).join('');
    const fields = $('#parameter-fields');
    fields.innerHTML = '';
    item.params.forEach(param => {
      const wrapper = document.createElement('div');
      wrapper.className = 'field';
      const id = `param-${Math.random().toString(36).slice(2)}`;
      wrapper.innerHTML = `<label for="${id}">${escapeHtml(param.name)} ${param.required ? '<em>Required</em>' : '<em>Optional</em>'}</label><input id="${id}" name="${escapeHtml(param.name)}" autocomplete="off" placeholder="${escapeHtml(param.description || (param.required ? `Enter ${param.name}` : 'Leave blank if not needed'))}" ${param.required ? 'required' : ''}>`;
      fields.appendChild(wrapper);
    });
    // Every catalogue card gets a usable input, even while upstream parameter
    // metadata is unavailable. Choose a sensible parameter name from its group.
    if (!item.params.length) {
      const groupName = (item.groupName || '').toLowerCase();
      const noInput = /games|fanart|sfw|pies|quote/.test(groupName);
      if (!noInput) {
        const wrapper = document.createElement('div');
        wrapper.className = 'field';
        const itemName = item.name.toLowerCase();
        const isDownloader = groupName.includes('downloader') || /download/.test(itemName);
        const isAi = groupName.includes('ai') || /chatgpt|dall|image/.test(itemName);
        const isImage = /image|screenshot|background|fanart|waifu|neko|husby|shota|annie|mikasa|nami|sakura|sasha|vivi|pies/.test(itemName) || ['fanart','sfw','pies'].some(x => groupName.includes(x));
        const paramName = isDownloader || isImage ? 'url' : (isAi ? 'prompt' : 'text');
        const label = paramName === 'url' ? 'Image or video URL' : (paramName === 'prompt' ? 'Prompt' : 'Input');
        const id = `generic-${Math.random().toString(36).slice(2)}`;
        wrapper.innerHTML = `<label for="${id}">${label} <em>Input</em></label><input id="${id}" name="${paramName}" autocomplete="off" placeholder="${paramName === 'url' ? 'Paste a URL here' : 'Enter your prompt or text here'}">`;
        fields.appendChild(wrapper);
      }
    }
    $('#response-panel').hidden = true;
    $('#body-field').hidden = !['POST', 'PUT', 'PATCH'].includes(methodSelect.value);
    methodSelect.onchange = () => { $('#body-field').hidden = !['POST', 'PUT', 'PATCH'].includes(methodSelect.value); };
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() { modal.hidden = true; document.body.style.overflow = ''; }

  function buildRequest() {
    const item = state.active;
    const method = $('#request-method').value;
    const url = new URL(item.path, location.origin);
    $('#parameter-fields').querySelectorAll('input').forEach(input => {
      const value = input.value.trim();
      const param = item.params.find(entry => entry.name === input.name);
      if (value) url.searchParams.set(input.name, value);
      else if (param?.required) throw new Error(`${input.name} is required`);
    });
    let body;
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const raw = $('#request-body').value.trim();
      if (raw) {
        try { body = JSON.parse(raw); } catch { throw new Error('Request body must be valid JSON'); }
      }
    }
    return { url, method, body };
  }

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); toast('Copied to clipboard'); }
    catch { toast('Clipboard access is unavailable in this browser'); }
  }

  $('#search-input').addEventListener('input', event => { state.query = event.target.value; renderGroups(); });
  $('#refresh-btn').addEventListener('click', () => loadCatalogue(true));
  $('#close-modal').addEventListener('click', closeModal);
  modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
    if (event.key === '/' && modal.hidden && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) { event.preventDefault(); $('#search-input').focus(); }
  });
  $('#copy-request').addEventListener('click', () => {
    try { const request = buildRequest(); copyText(request.url.href); }
    catch (error) { toast(error.message); }
  });
  $('#copy-response').addEventListener('click', () => copyText($('#response-output').textContent));
  $('#request-form').addEventListener('submit', async event => {
    event.preventDefault();
    const sendButton = $('#send-request');
    const responsePanel = $('#response-panel');
    sendButton.disabled = true;
    sendButton.textContent = 'Sending…';
    try {
      const request = buildRequest();
      const started = performance.now();
      const response = await fetch(request.url.href, {
        method: request.method,
        headers: request.body ? { 'Content-Type': 'application/json' } : {},
        body: request.body ? JSON.stringify(request.body) : undefined
      });
      const elapsed = Math.round(performance.now() - started);
      const contentType = response.headers.get('content-type') || '';
      const imageBox = $('#response-image');
      if (imageBox) {
        if (imageBox.dataset.url) URL.revokeObjectURL(imageBox.dataset.url);
        imageBox.removeAttribute('src');
        imageBox.hidden = true;
        delete imageBox.dataset.url;
      }
      let output;
      if (contentType.includes('application/json') || contentType.includes('text/json')) {
        const data = await response.json();
        output = JSON.stringify(data, null, 2);
      } else if (contentType.startsWith('image/')) {
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        if (imageBox) {
          imageBox.src = objectUrl;
          imageBox.dataset.url = objectUrl;
          imageBox.hidden = false;
        }
        output = `Image · ${contentType} · ${blob.size} bytes`;
      } else {
        output = await response.text();
      }
      $('#response-status').textContent = `${response.status} ${response.ok ? 'OK' : 'ERROR'}`;
      $('#response-status').style.color = response.ok ? 'var(--green)' : '#ff8585';
      $('#response-time').textContent = `${elapsed} ms`;
      $('#response-output').textContent = output;
      responsePanel.hidden = false;
      responsePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (error) {
      $('#response-status').textContent = 'REQUEST ERROR';
      $('#response-time').textContent = '';
      $('#response-output').textContent = error.message;
      responsePanel.hidden = false;
    } finally {
      sendButton.disabled = false;
      sendButton.innerHTML = 'Send request <span>→</span>';
    }
  });

  loadCatalogue();
  // Re-sync periodically so newly published upstream routes do not disappear from a stale page.
  setInterval(() => loadCatalogue(), 120000);
})();
