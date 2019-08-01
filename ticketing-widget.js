const domainURL = 'https://ticketing.gravity.eventtus.com';

function eventtusWidget() {
  const closeWidget = () => {
    document.getElementById('eventtusWidgetFrame').remove();
  };

  const showLoader = () => {
    const iframe = document.getElementById('eventtusWidgetFrame');
    iframe.style.backgroundColor = 'rgba(56, 64, 74, 0.9)';
  };

  const hideLoader = () => {
    const iframe = document.getElementById('eventtusWidgetFrame');
    iframe.style.background = '';
    iframe.style.backgroundColor = 'rgba(56, 64, 74, 0.9)';
  };

  document.getElementById('eventtusWidgetContainer').onclick = function () {
    const eventId = document.getElementById('eventtusWidgetScriptTag').src.split('eventId=')[1];
    
    try {
      const iframe = document.createElement('iframe');
      iframe.allowFullscreen = true;
      iframe.allowPaymentRequest = true;
      iframe.id = 'eventtusWidgetFrame';
      iframe.src = domainURL + '/' + eventId + '/tickets?mode=embed';
      iframe.style =
        `position: absolute; top: 0px; left: 0px; display: block; margin: 0px; padding: 0px; border: none; height: 100vh; width: 100vw; z-index: 2147483647; background-color: rgba(56, 64, 74, 0.9); transition: background-color 1s cubic-bezier(0.645, 0.045, 0.355, 1)`;
      document.body.appendChild(iframe);
    } catch (err) {
      window.open(domainURL + '/' + eventId + '/tickets', '_blank');
      return err;
    }
  };

  window.addEventListener('message', event => {
    if (event.origin.indexOf(domainURL) !== -1) {
      switch (event.data) {
        case 'eventtusShowLoader':
          showLoader();
          return;

        case 'eventtusHideLoader':
          hideLoader();
          return;

        case 'eventtusWidgetClose':
          closeWidget();
          return;

        default:
          return;
      }
    }
  });
}
window.onload = eventtusWidget;
