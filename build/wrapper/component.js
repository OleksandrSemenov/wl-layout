import Component from 'build/wrapper/component';

if (typeof window !== 'undefined' && window.UIkit) {
    window.UIkit.component(NAME, Component);
}

export default Component;
