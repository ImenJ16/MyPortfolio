// emailjs-config.js
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'umISSDzapbUFbZbrl',
    SERVICE_ID: 'service_kkvuxlf',
    TEMPLATE_ID: 'template_g95mi8p',
    NAME_TEMPLATE_ID: 'template_kc0rsgi' 

};

// Initialize EmailJS
(function () {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
})();