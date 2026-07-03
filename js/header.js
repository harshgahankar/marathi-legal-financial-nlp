(function () {
    var base = window.__basePath || '.';
    var container = document.getElementById('header-inner');
    if (!container) return;

    var html = '';
    html += '<div class="flex justify-between items-center w-full px-gutter max-w-container-max mx-auto h-full">';
    html += '<div class="flex items-center gap-4">';
    html += '<span class="font-h2 text-h2 font-bold text-primary dark:text-primary-fixed">Marathi NLP Portal</span>';
    html += '</div>';
    html += '<div class="hidden md:flex items-center gap-stack-lg">';
    html += '<a class="font-body-md text-body-md text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed transition-colors" href="' + base + '/index.html">Home</a>';
    html += '<a class="font-body-md text-body-md text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed transition-colors" href="' + base + '/pages/concepts.html">Docs</a>';
    html += '<a class="font-body-md text-body-md text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed transition-colors" href="javascript:window.print()">PDF Export</a>';
    html += '</div>';
    html += '<div class="flex items-center gap-stack-md">';
    html += '<div class="relative hidden sm:block">';
    html += '<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>';
    html += '<input class="bg-surface-container-low border-none rounded-full pl-10 pr-12 py-2 text-sm focus:ring-2 focus:ring-primary w-64 transition-all outline-none" placeholder="Search Marathi NLP..." type="text" />';
    html += '<span class="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-outline border border-outline-variant px-1 rounded">\u2318K</span>';
    html += '</div>';
    html += '<button id="dark-toggle" class="material-symbols-outlined text-primary dark:text-primary-fixed p-2 hover:bg-surface-variant rounded-full transition-colors">dark_mode</button>';
    html += '<button class="lg:hidden material-symbols-outlined text-primary">menu</button>';
    html += '</div>';
    html += '</div>';

    container.innerHTML = html;

    var toggle = document.getElementById('dark-toggle');
    if (toggle) {
        var isDark = document.documentElement.classList.contains('dark');
        toggle.textContent = isDark ? 'light_mode' : 'dark_mode';
        toggle.addEventListener('click', function () {
            isDark = !isDark;
            document.documentElement.classList.toggle('dark');
            toggle.textContent = isDark ? 'light_mode' : 'dark_mode';
        });
    }

    document.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            var input = container.querySelector('input[type="text"]');
            if (input) input.focus();
        }
    });
})();
