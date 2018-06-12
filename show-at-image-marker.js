// ARKit image anchor orientations need adjustment to apply to A-Frame plane-based entities.
var imageAnchorToPlaneQuat = new THREE.Quaternion();          
imageAnchorToPlaneQuat.setFromAxisAngle(new THREE.Vector3(1,0,0), THREE.Math.DEG2RAD * -90);

AFRAME.registerComponent('show-at-image-marker', {
  schema: {
    name: { type: 'string' },
    src: { type: 'string' },
    physicalWidth: { type: 'number' },
    vertical: { default: false }
  },

  init: function () {
    this.el.setAttribute('visible', false);
    this.added = false;
  },

  tick: function () {
    if (!this.source) {
      this.source = document.querySelector('[ar]').components.ar.getSource();
    }
    
    if (!this.source) { return; }
    
    if (!this.added) {
      this.source.addImage(this.data.name, 
                         this.data.src,
                         this.data.physicalWidth);
      this.added = true;
      return;
    }

    var anchors = this.source.getAnchors();
    if (anchors && anchors.length) {
      var i;
      for (i=0; i<anchors.length; i++) {
        // Check which image anchor (by name) has been detected.
        if (anchors[i].name === this.data.name) {
          var mat = new THREE.Matrix4().fromArray(anchors[i].modelMatrix);
          mat.decompose(this.el.object3D.position, this.el.object3D.quaternion, this.el.object3D.scale);
          if (this.data.vertical) { 
            this.el.object3D.quaternion.multiply(imageAnchorToPlaneQuat);
          }
          
          if (!this.el.getAttribute('visible')) {
            this.el.setAttribute('visible', true);                
            this.el.emit('imageanchor', {anchor: anchors[i]});
          } else {
            this.el.emit('imageanchorupdate', {anchor: anchors[i]});
          }
          
          // Remove the image since we've detected it.
          if (!this.removed) {
            this.removed = true;
            this.source.removeImage(this.data.name);
          }
        }
      }
    }
  }        
});