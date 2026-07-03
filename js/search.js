(function () {
    var base = window.__basePath || '.';

    var pages = [
        { title: 'Home', path: base + '/index.html', desc: 'Marathi NLP Research Portal — overview, pipeline, and key techniques for Marathi language processing.', keywords: 'home overview marathi nlp pipeline' },
        { title: 'Concepts', path: base + '/pages/concepts.html', desc: 'Core NLP concepts for Marathi — preprocessing, feature engineering, language representation, language models.', keywords: 'concepts preprocessing feature engineering language representation models' },
        { title: 'Preprocessing', path: base + '/pages/preprocessing.html', desc: 'Sentence segmentation, tokenization, stop-word removal, stemming, lemmatization, noise removal, text cleaning.', keywords: 'preprocessing tokenization stemming lemmatization stop word removal noise cleaning' },
        { title: 'Feature Engineering', path: base + '/pages/feature-engineering.html', desc: 'Bag of Words, N-Grams, Term Frequency, Inverse Document Frequency, TF-IDF for Marathi text.', keywords: 'feature engineering bag of words ngrams tf idf tf-idf vectorization' },
        { title: 'Language Representation', path: base + '/pages/language-representation.html', desc: 'Word embeddings, Word2Vec, FastText, contextual embeddings for Marathi NLP.', keywords: 'word embeddings word2vec fasttext contextual embeddings representation' },
        { title: 'Language Models', path: base + '/pages/language-models.html', desc: 'Neural language models and transformer-based representations for Marathi.', keywords: 'language models neural transformer representations marathi' },
        { title: 'Analysis', path: base + '/pages/comparisons.html', desc: 'Comparative analysis — Stemming vs Lemmatization, TF vs TF-IDF, Word2Vec vs FastText.', keywords: 'analysis comparison stemming lemmatization tf tf-idf word2vec fasttext' },
        { title: 'Workflows', path: base + '/pages/workflows.html', desc: 'Interactive pipelines — text preprocessing, feature engineering, text-to-vector transformation.', keywords: 'workflows pipeline preprocessing feature engineering text to vector' },
        { title: 'Applications', path: base + '/pages/applications.html', desc: 'Real-world applications — legal document analysis, financial report processing, tax document processing.', keywords: 'applications legal financial tax document ner ocr' },
        { title: 'Insights & Research', path: base + '/pages/research.html', desc: 'Research insights, datasets, tools, and libraries for Marathi NLP.', keywords: 'insights research datasets tools libraries marathi nlp' },
        { title: 'Social Impact', path: base + '/pages/sustainability.html', desc: 'Sustainability, social impact, and future directions for Marathi language technology.', keywords: 'impact sustainability social future marathi technology' }
    ];

    var modalOverlay = null;
    var searchInput = null;
    var resultsList = null;
    var selectedIndex = -1;
    var currentResults = [];

    function createSearchModal() {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'search-modal-overlay';
        modalOverlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.4);backdrop-filter:blur(4px);display:none;align-items:flex-start;justify-content:center;padding-top:10vh;animation:fadeIn 0.15s ease-out;';

        var modal = document.createElement('div');
        modal.style.cssText = 'background:#fff;border-radius:16px;width:640px;max-width:90vw;max-height:70vh;display:flex;flex-direction:column;box-shadow:0 25px 60px rgba(0,0,0,0.25);overflow:hidden;';

        var html = '';
        html += '<div style="padding:16px 20px;border-bottom:1px solid #e4e2e4;display:flex;align-items:center;gap:12px;">';
        html += '<span class="material-symbols-outlined" style="color:#76777d;font-size:20px;">search</span>';
        html += '<input id="search-modal-input" type="text" placeholder="Search pages, techniques, concepts..." style="flex:1;border:none;outline:none;font-size:15px;background:transparent;color:#1b1b1d;" autocomplete="off" />';
        html += '<span style="font-size:10px;color:#76777d;border:1px solid #c6c6cd;padding:1px 6px;border-radius:4px;font-weight:bold;">ESC</span>';
        html += '</div>';

        html += '<div id="search-modal-results" style="overflow-y:auto;flex:1;padding:8px 0;"></div>';

        modal.innerHTML = html;
        modalOverlay.appendChild(modal);

        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) closeSearch();
        });

        document.body.appendChild(modalOverlay);

        searchInput = document.getElementById('search-modal-input');
        resultsList = document.getElementById('search-modal-results');

        searchInput.addEventListener('input', function () {
            performSearch(this.value);
        });

        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < currentResults.length) {
                    navigateTo(currentResults[selectedIndex].path);
                } else if (currentResults.length > 0) {
                    navigateTo(currentResults[0].path);
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                moveSelection(1);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                moveSelection(-1);
            } else if (e.key === 'Escape') {
                closeSearch();
            }
        });
    }

    function performSearch(query) {
        var q = query.toLowerCase().trim();
        if (!q) {
            currentResults = pages.slice(0, 6);
            selectedIndex = -1;
            renderResults();
            return;
        }

        var scored = [];
        for (var i = 0; i < pages.length; i++) {
            var p = pages[i];
            var score = 0;
            var titleLower = p.title.toLowerCase();
            var kwLower = p.keywords.toLowerCase();
            var descLower = p.desc.toLowerCase();

            if (titleLower === q) score += 100;
            if (titleLower.indexOf(q) === 0) score += 50;
            if (titleLower.indexOf(q) > 0) score += 30;
            if (kwLower.indexOf(q) >= 0) score += 20;
            if (descLower.indexOf(q) >= 0) score += 10;

            var qWords = q.split(/\s+/);
            for (var w = 0; w < qWords.length; w++) {
                if (qWords[w].length < 2) continue;
                if (titleLower.indexOf(qWords[w]) >= 0) score += 15;
                if (kwLower.indexOf(qWords[w]) >= 0) score += 8;
                if (descLower.indexOf(qWords[w]) >= 0) score += 4;
            }

            if (score > 0) scored.push({ page: p, score: score });
        }

        scored.sort(function (a, b) { return b.score - a.score; });
        currentResults = scored.map(function (s) { return s.page; });
        selectedIndex = -1;
        renderResults();
    }

    function renderResults() {
        if (!resultsList) return;
        var html = '';

        if (currentResults.length === 0) {
            html += '<div style="padding:40px 20px;text-align:center;color:#76777d;">';
            html += '<span class="material-symbols-outlined" style="font-size:40px;display:block;margin-bottom:8px;">search_off</span>';
            html += '<p style="font-size:14px;">No pages found. Try different keywords.</p>';
            html += '</div>';
            resultsList.innerHTML = html;
            return;
        }

        for (var i = 0; i < currentResults.length; i++) {
            var p = currentResults[i];
            var isSelected = i === selectedIndex;
            var border = isSelected ? '2px solid #0F172A' : '2px solid transparent';
            var bg = isSelected ? '#f0edef' : 'transparent';

            html += '<div class="search-result-item" data-index="' + i + '" data-path="' + p.path + '" style="padding:12px 20px;cursor:pointer;border-left:' + border + ';background:' + bg + ';transition:all 0.1s;" onmouseenter="this.style.background=\'#f0edef\'" onmouseleave="this.style.background=\'' + (isSelected ? '#f0edef' : 'transparent') + '\'" onclick="window.searchNavigate(\'' + p.path + '\')">';
            html += '<div style="display:flex;align-items:center;gap:12px;">';
            html += '<span class="material-symbols-outlined" style="color:#0F172A;font-size:18px;">article</span>';
            html += '<div style="flex:1;min-width:0;">';
            html += '<div style="font-weight:600;font-size:14px;color:#1b1b1d;">' + p.title + '</div>';
            html += '<div style="font-size:12px;color:#76777d;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + p.desc + '</div>';
            html += '</div>';
            html += '<span class="material-symbols-outlined" style="color:#76777d;font-size:16px;opacity:0.5;">open_in_new</span>';
            html += '</div>';
            html += '</div>';
        }

        resultsList.innerHTML = html;
    }

    function moveSelection(dir) {
        if (currentResults.length === 0) return;
        selectedIndex += dir;
        if (selectedIndex < 0) selectedIndex = 0;
        if (selectedIndex >= currentResults.length) selectedIndex = currentResults.length - 1;
        renderResults();
        var items = resultsList.querySelectorAll('.search-result-item');
        if (items[selectedIndex]) {
            items[selectedIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    function navigateTo(path) {
        closeSearch();
        window.location.href = path;
    }

    window.searchNavigate = navigateTo;

    function openSearch() {
        if (!modalOverlay) createSearchModal();
        modalOverlay.style.display = 'flex';
        searchInput.value = '';
        performSearch('');
        setTimeout(function () { searchInput.focus(); }, 100);
        document.body.style.overflow = 'hidden';
    }

    function closeSearch() {
        if (modalOverlay) {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    document.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
        if (e.key === 'Escape' && modalOverlay && modalOverlay.style.display === 'flex') {
            closeSearch();
        }
    });

    var searchIcon = document.querySelector('.material-symbols-outlined.absolute.left-3');
    if (searchIcon) {
        searchIcon.parentElement.addEventListener('click', function (e) {
            if (e.target.tagName !== 'INPUT') {
                openSearch();
            }
        });
    }
})();
