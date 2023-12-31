import { hasAttr, isInView, isTag, isVideo, isVisible, mute, pause, play } from 'uikit-util';
import { intersection, resize } from '../api/observables';

export default {
    args: 'autoplay',

    props: {
        automute: Boolean,
        autoplay: Boolean,
    },

    data: {
        automute: false,
        autoplay: true,
    },

    connected() {
        this.inView = this.autoplay === 'inview';

        if (this.inView && !hasAttr(this.$el, 'preload')) {
            this.$el.preload = 'none';
        }

        if (isTag(this.$el, 'iframe') && !hasAttr(this.$el, 'allow')) {
            this.$el.allow = 'autoplay';
        }

        if (this.automute) {
            mute(this.$el);
        }
    },

    observe: [intersection({ args: { intersecting: false } }), resize()],

    update: {
        read({ visible }) {
            if (!isVideo(this.$el)) {
                return false;
            }

            return {
                prev: visible,
                visible: isVisible(this.$el),
                inView: this.inView && isInView(this.$el),
            };
        },

        write({ prev, visible, inView }) {
            if (!visible || (this.inView && !inView)) {
                pause(this.$el);
            } else if ((this.autoplay === true && !prev) || inView) {
                play(this.$el);
            }
        },

        events: ['resize'],
    },
};
