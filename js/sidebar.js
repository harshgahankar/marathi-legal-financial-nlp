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
        { id: 'impact', href: base + '/pages/sustainability.html', icon: 'trending_up', label: 'Impact' },
        { id: 'contribute', href: base + '/pages/contribute.html', icon: 'handshake', label: 'Contribute' }
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
    container.innerHTML = html;
})();
