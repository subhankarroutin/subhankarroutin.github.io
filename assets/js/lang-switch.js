/* ============================================================
   lang-switch.js — reusable "choose edition" switcher.
   Auto-wires any [data-lang-scope] block on the page. No setup needed
   beyond including this file once and following the markup contract
   documented in assets/css/book.css above .lang-switch.
============================================================ */
(function () {
  function fieldEls(scope, field) {
    return scope.querySelectorAll('[data-lang-field~="' + field + '"]');
  }

  document.querySelectorAll('[data-lang-scope]').forEach(function (scope) {
    var switcher = scope.querySelector('.lang-switch');
    if (!switcher) return;
    var pills = switcher.querySelectorAll('.lang-switch__pill');

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');

        if (pill.dataset.cover) {
          fieldEls(scope, 'cover').forEach(function (img) {
            img.classList.add('lang-switch__cover--fade');
            window.setTimeout(function () {
              img.src = pill.dataset.cover;
              img.classList.remove('lang-switch__cover--fade');
            }, 250);
          });
        }

        if (pill.dataset.title) {
          fieldEls(scope, 'title').forEach(function (el) { el.innerHTML = pill.dataset.title; });
        }
        if (pill.dataset.subtitle) {
          fieldEls(scope, 'subtitle').forEach(function (el) { el.innerHTML = pill.dataset.subtitle; });
        }
        if (pill.dataset.price) {
          fieldEls(scope, 'price').forEach(function (el) { el.innerHTML = pill.dataset.price; });
        }
        if (pill.dataset.delivery) {
          var deliveryHtml = (pill.dataset.deliveryIcon
            ? '<i class="fas ' + pill.dataset.deliveryIcon + '" aria-hidden="true"></i> '
            : '') + pill.dataset.delivery;
          fieldEls(scope, 'delivery').forEach(function (el) { el.innerHTML = deliveryHtml; });
        }
        if (pill.dataset.cta) {
          fieldEls(scope, 'cta-label').forEach(function (el) { el.textContent = pill.dataset.cta; });
        }
        if (pill.dataset.href) {
          fieldEls(scope, 'cta-href').forEach(function (el) { el.href = pill.dataset.href; });
        }
      });
    });
  });
})();
