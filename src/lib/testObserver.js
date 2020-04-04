import { useEffect } from "react";

export default ({ root, target, onIntersect, threshold = 0, rootMargin = "0px" }) => {
    useEffect(
        () => {

            if (!root) {
                return;
            }

            const observer = new IntersectionObserver(onIntersect, {
                root,
                rootMargin,
                threshold,
            });

            if (!target) {
                return;
            }

            observer.observe(target);

            return () => {
                observer.unobserve(target);
            };
        }, [target, root, rootMargin, onIntersect, threshold]
    );
};