aframe-ar example
=========================

This is a basic example of AR camera using [aframe-ar](https://github.com/chenzlabs/aframe-ar) with experimental browsers for [ARKit](https://github.com/google-ar/WebARonARKit) and [ARCore](https://github.com/google-ar/WebARonARCore).

By simply adding the `ar` component to your [A-Frame](https://aframe.io) scene declaration:

```
<a-scene ar>
...
</a-scene>
```

[aframe-ar](https://github.com/chenzlabs/aframe-ar) will, when using a supported browser, take over the scene camera using information from ARKit / ARCore.