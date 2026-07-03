(function () {
    var base = window.__basePath || '.';
    var active = window.__activePage || 'home';

    var pages = [
        { id: 'home', href: base + '/index.html', icon: 'home', label: 'Home' },
        { id: 'concepts', href: base + '/pages/concepts.html', icon: 'menu_book', label: 'Concepts' },
        { id: 'analysis', href: base + '/pages/comparisons.html', icon: 'analytics', label: 'Analysis' },
        { id: 'workflows', href: base + '/pages/workflows.html', icon: 'account_tree', label: 'Workflows' },
        { id: 'applications', href: base + '/pages/applications.html', icon: 'settings_applications', label: 'Applications' },
        { id: 'insights', href: base + '/pages/research.html', icon: 'lightbulb', label: 'Insights' },
        { id: 'impact', href: base + '/pages/sustainability.html', icon: 'trending_up', label: 'Impact' }
    ];

    var container = document.getElementById('sidebar-inner');
    if (!container) return;

    var html = '';
    html += '<div class="mb-stack-lg px-2">';
    html += '<h3 class="font-h3 text-h3 font-bold text-on-surface">Research Portal</h3>';
    html += '<p class="text-secondary font-label-caps text-label-caps">Linguistic Analysis</p>';
    html += '</div>';
    html += '<nav class="flex flex-col gap-1 flex-grow overflow-y-auto">';

    for (var i = 0; i < pages.length; i++) {
        var p = pages[i];
        var isActive = p.id === active;
        html += '<a class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all ';
        if (isActive) {
            html += 'bg-secondary-fixed text-primary font-bold border-l-4 border-on-tertiary-container';
        } else {
            html += 'text-secondary hover:bg-surface-container-high';
        }
        html += '" href="' + p.href + '">';
        html += '<span class="material-symbols-outlined">' + p.icon + '</span>';
        html += '<span class="font-body-md text-body-md">' + p.label + '</span>';
        html += '</a>';
    }

    html += '</nav>';
    html += '<div class="mt-auto pt-stack-lg">';
    html += '<button id="download-dataset-btn" class="w-full bg-primary text-on-primary py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm hover:opacity-90">';
    html += '<span class="material-symbols-outlined">download</span>';
    html += 'Download Dataset';
    html += '</button>';
    html += '</div>';

    container.innerHTML = html;

    var downloadBtn = document.getElementById('download-dataset-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function () {
            var existingModal = document.getElementById('dataset-modal-overlay');
            if (existingModal) existingModal.remove();
            var overlay = document.createElement('div');
            overlay.id = 'dataset-modal-overlay';
            overlay.style.cssText = 'position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,0.4);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;animation:fadeIn 0.15s ease-out;';
            overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
            var modal = document.createElement('div');
            modal.style.cssText = 'background:#fff;border-radius:16px;width:480px;max-width:90vw;padding:28px 32px;box-shadow:0 25px 60px rgba(0,0,0,0.25);';
            var mhtml = '';
            mhtml += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">';
            mhtml += '<h3 style="font-size:20px;font-weight:700;color:#0F172A;">Marathi NLP Datasets</h3>';
            mhtml += '<span id="dataset-close-btn" class="material-symbols-outlined" style="cursor:pointer;color:#76777d;font-size:22px;">close</span>';
            mhtml += '</div>';
            mhtml += '<div style="border-top:1px solid #e4e2e4;padding-top:16px;">';
            var datasets = [
                { name: 'Marathi-Legal-500k', desc: '500K legal documents for summarization & NER', size: '2.4 GB', format: 'JSONL' },
                { name: 'MahaNews-Corpus', desc: 'News articles from Maharashtra (2015-2024)', size: '8.1 GB', format: 'Text + JSON' },
                { name: 'Marathi-Financial-Reports', desc: 'Annual reports, tax filings, audit docs', size: '1.8 GB', format: 'PDF + JSON' },
                { name: 'IndicGLUE-Marathi', desc: 'Marathi subset of IndicGLUE benchmark', size: '420 MB', format: 'JSONL' }
            ];
            for (var i = 0; i < datasets.length; i++) {
                var d = datasets[i];
                mhtml += '<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:' + (i < datasets.length - 1 ? '1px solid #f0edef' : 'none') + ';">';
                mhtml += '<div style="flex:1;min-width:0;">';
                mhtml += '<div style="font-weight:600;font-size:14px;color:#1b1b1d;">' + d.name + '</div>';
                mhtml += '<div style="font-size:12px;color:#76777d;margin-top:2px;">' + d.desc + '</div>';
                mhtml += '<div style="font-size:11px;color:#10B981;margin-top:2px;">' + d.size + ' \u00B7 ' + d.format + '</div>';
                mhtml += '</div>';
                mhtml += '<button class="mock-download-btn" data-dataset="' + d.name + '" style="background:#0F172A;color:#fff;border:none;padding:6px 14px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap;">Download</button>';
                mhtml += '</div>';
            }
            mhtml += '</div>';
            mhtml += '<p style="font-size:11px;color:#76777d;text-align:center;margin-top:16px;padding-top:12px;border-top:1px solid #f0edef;">These datasets are publicly available for academic research.</p>';
            modal.innerHTML = mhtml;
            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            document.getElementById('dataset-close-btn').addEventListener('click', function () { overlay.remove(); });
            overlay.querySelectorAll('.mock-download-btn').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var name = this.getAttribute('data-dataset');
                    this.textContent = 'Opening...';
                    this.style.opacity = '0.6';
                    this.disabled = true;
                    setTimeout(function () {
                        var notice = document.createElement('div');
                        notice.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#0F172A;color:#fff;padding:12px 24px;border-radius:12px;font-size:14px;z-index:9999;box-shadow:0 8px 30px rgba(0,0,0,0.3);animation:slideUp 0.3s ease-out;';
                        notice.textContent = name + ' download started — check your downloads folder.';
                        document.body.appendChild(notice);
                        setTimeout(function () { notice.remove(); }, 3000);
                        btn.textContent = 'Download';
                        btn.style.opacity = '1';
                        btn.disabled = false;
                    }, 800);
                });
            });
        });
    }
})();
