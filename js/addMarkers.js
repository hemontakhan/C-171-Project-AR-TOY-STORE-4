AFRAME.registerComponent('create-markers',{
 init: async function(){
    var mainScene = document.querySelector('#main-scene');
  var toys = await this.getAllToys();
  toys.map(toy =>{
    var marker = document.createElement('a-marker');
    marker.setAttribute('id',toy.id);
    marker.setAttribute('type','pattern');
    marker.setAttribute('url',toy.marker_pattern_url)
    marker.setAttribute('cursor',{
        rayOrigin : 'mouse'
    })

    marker.setAttribute('markerhandler',{})
    mainScene.appendChild(marker)

    var model = document.createElement('a-entity');
    model.setAttribute('id',`model-$(toy.id)`)
    model.setAttribute('position',toy.model_geometry.position);
    model.setAttribute('rotation',toy.model_geometry.rotation);
    model.setAttribute('scale',toy.model_geometry.scale)
    model.setAttribute('gltf-model',`url(${toy.model_url})`);
    model.setAttribute('gesture-handler',{})

    marker.appendChild(model)


    var infoPlane = document.createElement('a-plane');
    infoPlane.setAttribute('position',{x: 0,y: 0,z: 0.5});
    infoPlane.setAttribute('rotation',{x: 0,y: 0,z: 0})
    infoPlane.setAttribute('width',10);
    infoPlane.setAttribute('height',12);
    infoPlane.setAttribute('material',{
      color : 'yellow'
    })
    marker.appendChild(infoPlane);

    var description = document.createElement('a-entity');
    description.setAttribute('position',{x: 0,y: 0,z: 0.49})
    description.setAttribute('rotation',{x: 0,y: 0,z: 0});
    description.setAttribute('text',{
        font: 'monoid',
        color: 'white',
        width: 2,
        height: 1.5,
        value: `${toy.description.join('\n\n')}`
    });

    infoPlane.appendChild(description);

    var titlePlane = document.createElement('a-plane');
    titlePlane.setAttribute('position',{x: 0,y: 0.90,z: 0.5});
    titlePlane.setAttribute('rotation',{x: 0,y: 0,z: 0});
    titlePlane.setAttribute('width',10);
    titlePlane.setAttribute('height',5);
    titlePlane.setAttribute('material',{
        color: 'pink'
    }) 
    
    var titleText = document.createElement('a-entity');
    titleText.setAttribute('position',{x: 0,y: 0.90,z: 0.49})
    titleText.setAttribute('rotation',{x: 0,y: 0,z: 0});
    titleText.setAttribute('text',{
        font : 'monoid',
        color: 'black',
        width: 5,
        height: 5,
        value: 'TOY CRANE TRUCK'
    });

    titlePlane.appendChild(titleText);
    infoPlane.appendChild(titlePlane);

    var pricePlane = document.createElement('a-entity');
    pricePlane.setAttribute('position',{x: -1.5,y: -0.75,z: 0.5})
    pricePlane.setAttribute('geometry',{
        primitive: 'circle',
        radius: 0.75
    })
    pricePlane.setAttribute('material',{
        color: 'black'
    });

    var priceText = document.createElement('a-entity');
    priceText.setAttribute('position',{x: -1.5,y: -0.75,z: 0.49});
    priceText.setAttribute('text',{
        font : 'monoid',
        color: 'black',
        width: 5,
        height: 5,
        value: `$ ${toy.price}`
    })

    pricePlane.appendChild(priceText);
    marker.appendChild(pricePlane);

  })
 },
 getAllToys: async function(){
    return await firebase
      .firestore()
      .collections('toys')
      .get()
      .then(snap =>{
        return snap.docs.map(doc => doc.data())
      });
 }
})