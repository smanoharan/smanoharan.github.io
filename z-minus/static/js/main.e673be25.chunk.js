(this["webpackJsonpz-minus"]=this["webpackJsonpz-minus"]||[]).push([[0],{34:function(e,t,i){e.exports=i(47)},39:function(e,t,i){},42:function(e,t,i){},43:function(e,t,i){},44:function(e,t,i){},45:function(e,t,i){},46:function(e,t,i){},47:function(e,t,i){"use strict";i.r(t);var n=i(8),a=i.n(n),s=i(32),r=i.n(s),o=(i(39),i(10)),h=i(15),u=i.n(h),c=u.a.mark(d),l=u.a.mark(v),f=u.a.mark(p);function d(e,t,i){var n,a;return u.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:n=t.subtract(e.position).normalize(),a=n.clone();case 2:if(!(o.j.Dot(n,a)>0)){s.next=11;break}return n.normalize().scaleToRef(e.unitType.maxSpeed,e.velocity),void(s.next=6);case 6:if(!i(e)){s.next=8;break}return s.abrupt("break",11);case 8:t.subtractToRef(e.position,a),s.next=2;break;case 11:e.velocity.scaleInPlace(0);case 12:case"end":return s.stop()}}),c)}function v(e,t){return u.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return e.angularVelocity=Math.PI*(1===e.owner.id?3:-3),i.delegateYield(p(e,t),"t0",2);case 2:e.angularVelocity=0;case 3:case"end":return i.stop()}}),l)}function p(e,t){return u.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:if(!t(e)){i.next=5;break}return void(i.next=3);case 3:i.next=0;break;case 5:case"end":return i.stop()}}),f)}function m(e){return Math.floor(Math.random()*e)}function y(e){if(e.length>0)return e[m(e.length)]}function w(e,t){if(0!==e.length){for(var i=e.map(t),n=m(function(e){for(var t=0,i=0;i<e.length;i++)t+=e[i];return t}(i)),a=0;a<i.length;a++)if((n-=i[a])<0)return e[a];return e[e.length-1]}}var g=u.a.mark(T),b=u.a.mark(S),k=u.a.mark(x);function M(e){var t=e.tile;return!!t&&(t.occupancy[e.owner.opponent.id]>0||(t.owner===e.owner.opponent||(t.owner===e.owner&&t.healthProportion()<.99||!(t!==e.owner.homeTile||!e.isDamaged()))))}function T(e,t,i){var n;return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:n=function(){return e.isDamaged()?t.neighbourClosestTo(e.tile,e.owner.homeTile):w(t.neighbours(e.tile),i)||e.owner.homeTile};case 1:if(!M){a.next=4;break}return a.delegateYield(v(e,M),"t0",4);case 4:return a.delegateYield(d(e,n().toPos(),M),"t1",5);case 5:a.next=1;break;case 7:case"end":return a.stop()}}),g)}function S(e,t){return u.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.delegateYield(T(e,t,(function(t){var i=Math.abs(e.owner.id-t.owner.id)+1;return i*i*i})),"t0",1);case 1:case"end":return i.stop()}}),b)}function x(e,t){return u.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.delegateYield(T(e,t,(function(t){var i=2-Math.abs(e.owner.id-t.owner.id)+1;return i*i*i})),"t0",1);case 1:case"end":return i.stop()}}),k)}var U={id:0,displayName:"Offensive",maxHealth:10,maxSpeed:1.5,attackVsUnit:4,attackVsTile:2,repairTile:.5,repairSelf:.5,meshFactory:function(e,t,i){var n={diameter:2*t,height:i,tessellation:3,enclose:!0};return o.g.CreateCylinder("offUnit",n,e)},aiFactory:function(e,t){return S(e,t)}},j={id:1,displayName:"Defensive",maxHealth:15,maxSpeed:2,attackVsUnit:3,attackVsTile:.25,repairTile:2,repairSelf:1,meshFactory:function(e,t,i){var n={diameter:1.7*t,height:i,tessellation:5,enclose:!0};return o.g.CreateCylinder("defUnit",n,e)},aiFactory:function(e,t){return x(e,t)}};var C={id:2,displayName:"Random",className:"rand",nextUnitType:function(){return y([U,j])}},E={minDurationState:.05,tileSize:2,drawnTileSize:1.96,unitCost:10,tileMaxHealth:20,homeTileMaxHealth:50,tileControlThreshold:.8,minUnitsToCapture:2,resourcesRate:1,unitTypes:[U,j],unitProdStrategies:[{id:0,displayName:"Offensive",className:"off",nextUnitType:function(){return U}},{id:1,displayName:"Defensive",className:"def",nextUnitType:function(){return j}},C],defaultUPS:C},O=i(17),P=i(18),R=i(22),H=function(){function e(t,i,n,a,s,r){var h=arguments.length>6&&void 0!==arguments[6]?arguments[6]:void 0;Object(O.a)(this,e),this.game=t,this.owner=i,this.isHome=n,this.resMult=a,this.coords=void 0,this.health=void 0,this.maxHealth=void 0,this.mesh=void 0,this.occupancy=void 0,void 0===h?h=-(s+r):s+r+h!==0&&console.error("Attempting to create an invalid Tile",{q:s,r:r,s:h}),this.coords=new o.j(s,r,h),this.mesh=void 0,this.maxHealth=n?E.homeTileMaxHealth:E.tileMaxHealth,this.health=n?this.maxHealth:0,this.occupancy=[0,0,0]}return Object(P.a)(e,[{key:"generate",value:function(t){this.mesh=this.game.view.makeTileMesh(this,t);for(var i=this.resMult,n=i<.75?3:2,a=(this.coords.x+n)%n,s=0;s<e.directions.length;s++)(i>1.5||i<.75&&s%3===a||i>=.75&&s%2===a)&&this.game.view.makeResourceMesh(this,s,t)}},{key:"equals",value:function(e){return this.coords.equals(e.coords)}},{key:"healthProportion",value:function(){return Math.min(1,Math.max(0,this.health/this.maxHealth))}},{key:"updateDrawn",value:function(e){}},{key:"updateState",value:function(e){var t=E.resourcesRate,i=E.tileControlThreshold;this.resolveUnits(this.game.aliveUnits,e),this.mesh.instancedBuffers.color=this.owner.tileColor(this.isHome,this.healthProportion()),this.healthProportion()>i&&(this.owner.resourceCount+=e*t*this.resMult)}},{key:"incHealth",value:function(e,t){var i=this.health+e*t;this.health=Math.min(this.maxHealth,Math.max(0,i))}},{key:"harm",value:function(e,t){this.incHealth(-e,t)}},{key:"heal",value:function(e,t){this.incHealth(e,t)}},{key:"canCapture",value:function(e){return this.owner===this.game.gaia&&e.length>=E.minUnitsToCapture}},{key:"resolveUnits",value:function(e,t){var i=this,n=e.filter((function(e){return e.tile===i}));if(0!==n.length){var a=Object(R.a)(this.game.players,3),s=a[0],r=a[1],o=a[2],h=n.filter((function(e){return e.owner===r})),u=n.filter((function(e){return e.owner===o}));if(this.occupancy=[0,h.length,u.length],h.length>0&&u.length>0)h.forEach((function(e){return e.attackUnit(y(u),t)})),u.forEach((function(e){return e.attackUnit(y(h),t)}));else{var c=n[0].owner;this.canCapture(n)&&(this.owner=c),this.owner===c?n.forEach((function(e){return e.repair(i,t)})):this.owner!==s&&(n.forEach((function(e){return e.attackTile(i,t)})),this.healthProportion()<.1&&(this.owner=s))}}}},{key:"toPosOffset",value:function(e,t){var i=this.coords,n=i.x,a=i.y,s=n+e.x*t,r=a+e.y*t;return new o.j(1.5*s*E.tileSize,0,N*(.5*s+r)*E.tileSize)}},{key:"toPos",value:function(){return this.toPosOffset(o.j.Zero(),0)}}],[{key:"distBetween",value:function(e,t){var i=e.coords.subtract(t.coords),n=i.x,a=i.y,s=i.z;return.5*(Math.abs(n)+Math.abs(a)+Math.abs(s))}},{key:"roundCoords",value:function(e,t){var i=-e-t,n=Math.round(e),a=Math.round(t),s=Math.round(i),r=Math.abs(e-n),o=Math.abs(t-a),h=Math.abs(i-s);return r>Math.max(o,h)?{q:-a-s,r:a}:o>h?{q:n,r:-n-s}:{q:n,r:a}}}]),e}();H.direction={NN:new o.j(0,1,-1),NE:new o.j(1,0,-1),SE:new o.j(1,-1,0),SS:new o.j(0,-1,1),SW:new o.j(-1,0,1),NW:new o.j(-1,1,0)},H.directions=[H.direction.NN,H.direction.NE,H.direction.SE,H.direction.SS,H.direction.SW,H.direction.NW];var N=Math.sqrt(3),D=function(){function e(t,i,n){Object(O.a)(this,e),this.game=t,this.radius=i,this.tiles=void 0,this.tileList=void 0,this.tiles=[],this.tileList=[];for(var a=i,s=-a;s<=a;s++){this.tiles[s+a]=[];for(var r=-a;r<=a;r++){var o=-(s+r);if(-a<=o&&o<=a&&n(s,r,o)){var h=0===s&&Math.abs(r)===a,u=t.players[h?r===a?1:2:0],c=Math.abs(s)<=1&&Math.abs(o-r)>=2,l=new H(t,u,h,h||o===r?2:c?.5:1,s,r);this.tiles[s+a][r+a]=l,this.tileList.push(l)}}}}return Object(P.a)(e,[{key:"generate",value:function(e){for(var t=0;t<this.tileList.length;t++){this.tileList[t].generate(e)}}},{key:"updateDrawn",value:function(e){for(var t=0;t<this.tileList.length;t++)this.tileList[t].updateDrawn(e)}},{key:"updateState",value:function(e){for(var t=0;t<this.tileList.length;t++)this.tileList[t].updateState(e)}},{key:"tile",value:function(e,t){var i=this.radius;if(-i<=e&&e<=i&&-i<=t&&t<=i)return this.tiles[e+i][t+i]}},{key:"neighbours",value:function(e){var t=this;return H.directions.map((function(i){return t.neighbour(e,i)})).filter((function(e){return!!e}))}},{key:"neighbourClosestTo",value:function(e,t){var i=this.neighbours(e);if(0===i.length)return t;for(var n=i.map((function(e){return H.distBetween(e,t)})),a=0,s=1;s<i.length;s++)n[s]<n[a]&&(a=s);return i[a]}},{key:"neighbour",value:function(e,t){return this.tile(e.coords.x+t.x,e.coords.y+t.y)}},{key:"posToTile",value:function(e){var t=e.x/E.tileSize,i=e.z/E.tileSize,n=H.roundCoords(2/3*t,(L*i-t)/3),a=n.q,s=n.r;return this.tile(a,s)}}]),e}(),L=Math.sqrt(3);function V(e,t){return e.filter(t).length}var z,A=function(){function e(t,i,n,a,s){Object(O.a)(this,e),this.game=t,this.id=i,this.name=n,this.hue=a,this.maxSaturation=s,this.stdTileColor=void 0,this.homeTileColor=void 0,this.fullUnitColor=void 0,this.deadUnitColor=void 0,this.opponent=void 0,this.homeTile=void 0,this.resourceCount=void 0,this.ups=void 0,this.stdTileColor=e.color(a,.4*s,.8),this.homeTileColor=e.color(a,.8*s,.6),this.fullUnitColor=e.color(a,.9*s,.95),this.deadUnitColor=e.color(a,.4*s,.3,.3),this.resourceCount=0,this.ups=E.defaultUPS,this.homeTile=void 0,this.opponent=void 0}return Object(P.a)(e,[{key:"generate",value:function(e){var t=this;this.homeTile=this.game.board.tileList.find((function(e){return e.owner===t&&e.isHome})),this.opponent=this.game.players.find((function(e){return e.id>0&&e.id!==t.id}))}},{key:"isAlive",value:function(){return this.homeTile.owner===this}},{key:"updateState",value:function(e){for(;this.resourceCount>E.unitCost;)this.resourceCount-=E.unitCost,this.game.spawnUnit(this,this.ups.nextUnitType(),this.homeTile)}},{key:"statusDisplayText",value:function(e){var t=this,i=Math.floor(this.resourceCount),n=V(e.board.tileList,(function(e){return e.owner===t})),a=V(e.aliveUnits,(function(e){return e.owner===t}));return"".concat(this.name,": $").concat(i,", ").concat(n," tile(s), ").concat(a," unit(s)")}},{key:"tileColor",value:function(t,i){var n=(t?.8:.4)*i*this.maxSaturation,a=t?.6:.8;return e.color(this.hue,n,a)}}],[{key:"color",value:function(e,t,i){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,a=new o.b;o.b.HSVtoRGBToRef(e,t,i,a);var s=a.r,r=a.g,h=a.b;return new o.c(s,r,h,n)}}]),e}();!function(e){e[e.active=0]="active",e[e.dead=1]="dead",e[e.won=2]="won",e[e.lost=3]="lost"}(z||(z={}));var I=2*Math.PI,B=function(){function e(t,i,n,a,s,r){Object(O.a)(this,e),this.game=t,this.id=i,this.owner=n,this.unitType=a,this.tile=s,this.position=r,this.mesh=void 0,this.ai=void 0,this.state=void 0,this.velocity=void 0,this.angularVelocity=void 0,this.targetAngle=void 0,this.health=void 0,this.state=z.active,this.velocity=new o.j,this.angularVelocity=0,this.targetAngle=0,this.health=this.unitType.maxHealth,this.mesh=void 0,this.ai=void 0}return Object(P.a)(e,[{key:"generate",value:function(e){this.mesh=this.game.view.makeUnitMesh(this,e),this.ai=this.unitType.aiFactory(this,this.game.board)}},{key:"updateDrawn",value:function(e){var t=.05+.01*this.owner.id;switch(this.state){case z.active:this.updatePhysics(e),this.mesh.position.y=t;break;case z.won:this.updatePhysics(e);var i=.2*(this.id%3+1)*(.8+Math.sin(this.mesh.rotation.y));this.mesh.position.y=t+Math.max(0,i)}}},{key:"updatePhysics",value:function(e){this.velocity.scaleAndAddToRef(e,this.position),this.mesh.position.copyFrom(this.position);var t=this.mesh.rotation.y+this.angularVelocity*e;t>=I?t-=I:t<0&&(t+=I),this.mesh.rotation.y=t}},{key:"healthProportion",value:function(){return this.health/this.unitType.maxHealth}},{key:"updateState",value:function(e){if(this.health<=.001&&this.setState(z.dead),this.state===z.active){if(this.ai.next(e),this.tile=this.game.board.posToTile(this.position)||this.owner.homeTile,this.velocity.length()>.1){var t=o.j.Dot(o.j.Forward(),this.velocity);this.mesh.rotation.y=Math.PI/6+Math.acos(t/this.velocity.length())}this.mesh.scaling.setAll(.5+.5*this.healthProportion())}}},{key:"incHealth",value:function(e,t){var i=this.health+e*t;this.health=Math.min(this.unitType.maxHealth,Math.max(0,i))}},{key:"harm",value:function(e,t){this.incHealth(-e,t)}},{key:"heal",value:function(e,t){this.incHealth(e,t)}},{key:"attackUnit",value:function(e,t){e.harm(this.unitType.attackVsUnit,t)}},{key:"attackTile",value:function(e,t){e.harm(this.unitType.attackVsTile,t)}},{key:"repair",value:function(e,t){e.heal(this.unitType.repairTile,t),this.game.canHeal(this,e)&&this.heal(this.unitType.repairSelf,t)}},{key:"isAlive",value:function(){return this.state===z.active||this.state===z.won}},{key:"isDamaged",value:function(){return this.healthProportion()<.99}},{key:"setState",value:function(e){if(this.state!==e){switch(e){case z.won:this.velocity.scaleInPlace(0),this.angularVelocity=this.id%4*2-3;break;case z.dead:case z.lost:this.mesh.instancedBuffers.color=this.owner.deadUnitColor,this.ai=void 0,this.velocity.scaleInPlace(0),this.mesh.position.y=.05+.001*this.owner.id}this.state=e}}}]),e}(),F=function(){function e(t){Object(O.a)(this,e),this.game=t,this.scene=void 0,this.shadows=void 0,this.scene=void 0,this.shadows=[]}return Object(P.a)(e,[{key:"generate",value:function(e){this.scene=e,e.ambientColor=new o.b(1,1,1);var t=new o.a("camera1",0,0,10,new o.j(0,6,16),e);t.lowerBetaLimit=.1,t.upperBetaLimit=Math.PI/2*.8,t.lowerRadiusLimit=10,t.upperRadiusLimit=100,t.setTarget(o.j.Zero());var i=e.getEngine().getRenderingCanvas();t.attachControl(i,!0);for(var n=[new o.e("light",new o.j(0,1,-2),e),new o.e("light",new o.j(1,1,1),e),new o.e("light",new o.j(-1,1,1),e)],a=0;a<n.length;a++)n[a].intensity=.4}},{key:"onAddMesh",value:function(e,t){if(t)for(var i=0;i<this.shadows.length;i++)this.shadows[i].addShadowCaster(e)}},{key:"makeTileMesh",value:function(t,i){e.tileMesh||(e.tileMesh=e.generateTileMesh(i,E.drawnTileSize),this.onAddMesh(e.tileMesh,!0));var n=t.coords,a=n.x,s=n.y,r=n.z,o=e.tileMesh.createInstance("tileMesh/".concat(a,"/").concat(s,"/").concat(r));return o.position.copyFrom(t.toPos()),o.isVisible=!0,this.onAddMesh(o,!0),o}},{key:"makeResourceMesh",value:function(t,i,n){e.resourceMesh||(e.resourceMesh=e.generateResourceMesh(n,.07*E.drawnTileSize),this.onAddMesh(e.resourceMesh,!0));var a=t.coords,s=a.x,r=a.y,o=a.z,h=e.resourceMesh.createInstance("resMesh/".concat(s,"/").concat(r,"/").concat(o,"/").concat(i)),u=t.toPosOffset(H.directions[i],.3);return h.position.x=u.x,h.position.z=u.z,h.rotation.y=i*Math.PI/6,h.isVisible=!0,this.onAddMesh(h,!0),h}},{key:"unitMeshPrototype",value:function(t){var i=t.unitType.id;return e.unitMesh[i]||(e.unitMesh[i]=e.generateUnitMesh(this.scene,t,.4,.1),this.onAddMesh(e.unitMesh[i],!0)),e.unitMesh[i]}},{key:"makeUnitMesh",value:function(e,t){var i=this.unitMeshPrototype(e).createInstance("unitMesh/".concat(e.id));return i.isVisible=!0,i.instancedBuffers.color=e.owner.fullUnitColor,i.position.copyFrom(e.position),this.onAddMesh(i,!0),i}}],[{key:"generateTileMesh",value:function(e,t){var i=new o.i("tileMeshMaterial",e);i.specularColor=new o.b(.5,.6,.87);var n=o.g.CreateDisc("tileMesh",{radius:t,tessellation:6,sideOrientation:o.f.DOUBLESIDE},e);return n.receiveShadows=!0,n.rotation.x=.5*Math.PI,n.material=i,n.isVisible=!1,n.registerInstancedBuffer("color",4),n.instancedBuffers.color=new o.c(1,1,1,1),n}},{key:"generateResourceMesh",value:function(e,t){var i=new o.i("resMeshMaterial",e);i.specularColor=new o.b(.5,.6,.87),i.diffuseColor=new o.b(1,.9,0);var n=t,a=t,s=o.g.CreateBox("resourceMesh",{width:n,depth:.05,height:a},e);return s.receiveShadows=!0,s.rotation.x=.5*Math.PI,s.position.y=0,s.material=i,s.isVisible=!1,s}},{key:"generateUnitMesh",value:function(e,t,i,n){var a=new o.i("unitMeshMaterial",e);a.specularColor=new o.b(.8,.8,.9);var s=t.unitType.meshFactory(e,i,n);return s.material=a,s.isVisible=!1,s.registerInstancedBuffer("color",4),s.instancedBuffers.color=new o.c(1,1,1,1),s}}]),e}();F.tileMesh=void 0,F.resourceMesh=void 0,F.unitMesh=[];var G=function(){function e(){Object(O.a)(this,e),this.players=void 0,this.gaia=void 0,this.board=void 0,this.allUnits=void 0,this.aliveUnits=void 0,this.scene=void 0,this.winner=void 0,this.view=void 0,this.listeners=void 0,this.elapsedSinceState=0,this.gaia=new A(this,0,"Gaia",180,.01);var t=new A(this,1,"Green",120,1),i=new A(this,2,"Red",0,1);this.players=[this.gaia,t,i],this.board=new D(this,2,(function(){return!0})),this.allUnits=[],this.aliveUnits=[],this.view=new F(this),this.scene=void 0,this.winner=void 0,this.listeners=[]}return Object(P.a)(e,[{key:"generate",value:function(e){this.view.generate(e),this.board.generate(e);for(var t=0;t<this.aliveUnits.length;t++)this.aliveUnits[t].generate(e);for(var i=0;i<this.players.length;i++){this.players[i].generate(e)}this.scene=e,this.reset()}},{key:"reset",value:function(){var e=Object(R.a)(this.players,3),t=e[1],i=e[2],n=this.board.neighbours(t.homeTile),a=this.board.neighbours(i.homeTile),s=Object(R.a)(E.unitTypes,2),r=s[0],o=s[1];this.spawnUnit(t,o,t.homeTile),this.spawnUnit(i,o,i.homeTile),this.spawnUnit(t,r,n[1]),this.spawnUnit(i,r,a[0])}},{key:"spawnUnit",value:function(e,t,i){var n=this.allUnits.length,a=new B(this,n,e,t,i,i.toPos());this.scene&&a.generate(this.scene),this.allUnits.push(a),this.aliveUnits.push(a)}},{key:"update",value:function(e){this.updateDrawn(e),this.elapsedSinceState+=e,this.running()&&this.elapsedSinceState>=E.minDurationState&&(this.updateState(this.elapsedSinceState),this.elapsedSinceState=0)}},{key:"updateDrawn",value:function(e){if(this.scene){this.board.updateDrawn(e);for(var t=0;t<this.aliveUnits.length;t++)this.aliveUnits[t].updateDrawn(e)}}},{key:"updateState",value:function(e){this.board.updateState(e);for(var t=0;t<this.aliveUnits.length;t++)this.aliveUnits[t].updateState(e);this.aliveUnits=this.allUnits.filter((function(e){return e.isAlive()}));for(var i=1;i<=2;i++){var n=this.players[i];if(n.updateState(e),!n.isAlive()){var a=this.players[3-i];this.finishGame(a)}}this.notifyListeners()}},{key:"addGameStateListenerEffect",value:function(e){var t=this;return this.listeners.push(e),function(){t.listeners=t.listeners.filter((function(t){return t!==e}))}}},{key:"notifyListeners",value:function(){for(var e=0;e<this.listeners.length;e++){var t=this.listeners[e];t.current&&t.current(this)}}},{key:"running",value:function(){return void 0===this.winner}},{key:"finishGame",value:function(e){this.winner=e;for(var t=0;t<this.aliveUnits.length;t++){var i=this.aliveUnits[t];i.setState(i.owner===e?z.won:z.lost)}}},{key:"canHeal",value:function(e,t){return t.isHome&&e.owner===t.owner&&t.healthProportion()>E.tileControlThreshold}}]),e}(),q=(i(42),function(e){var t=e.onGetMessage,i=e.outRef,s=Object(n.useRef)(null),r=Object(n.useCallback)((function(e){s.current&&(s.current.innerText=t(e))}),[s,t]);return Object(n.useEffect)((function(){i.current=r}),[i,r]),a.a.createElement("div",{className:"alert",ref:s})}),Y=(i(43),function(e){var t=e.className,i=e.active,n=e.onClick,s="control-panel-btn control-panel-btn-".concat(t);return a.a.createElement("button",{className:s,onClick:n,disabled:i})}),W=function(e){var t=e.btnUps,i=e.curUps,n=e.onSet;return a.a.createElement(Y,{className:t.className,active:t===i,onClick:function(){return n(t)}})},J=function(e){var t=e.player,i=e.position,s=e.outRef,r=Object(n.useRef)(null),o=Object(n.useState)(t.ups),h=Object(R.a)(o,2),u=h[0],c=h[1],l=Object(n.useCallback)((function(e){r.current&&(r.current.innerText=t.statusDisplayText(e))}),[r,t]);Object(n.useEffect)((function(){s&&(s.current=l)}),[s,l]),Object(n.useEffect)((function(){t.ups=u}),[t,u]);var f="control-panel control-panel-".concat(i);return a.a.createElement("div",{className:f},a.a.createElement("div",{className:"stats-p1",ref:r}),E.unitProdStrategies.map((function(e){return a.a.createElement(W,{key:e.id,btnUps:e,curUps:u,onSet:c})})))},Z=i(33),$=(i(44),function(e){var t=e.game;return a.a.createElement(Z.a,{antialias:!0,onSceneReady:function(e){return t.generate(e)},onRender:function(e){var i=e.getEngine().getDeltaTime(),n=Math.min(50,i);t.update(n/1e3)},id:"game-canvas"})}),K=(i(45),function(e){var t=e.outRef,i=Object(n.useRef)(null),s=Object(n.useCallback)((function(e){if(e.scene&&i.current){var t=Math.round(e.scene.getEngine().getFps());i.current.innerText="FPS: ".concat(t)}}),[i]);return Object(n.useEffect)((function(){t&&(t.current=s)}),[t,s]),a.a.createElement("div",{className:"stats"},a.a.createElement("div",{className:"stats-fps",ref:i}))});i(46);var Q=function(){var e=Object(n.useMemo)((function(){return new G}),[]),t=Object(n.useRef)(void 0),i=Object(n.useRef)(void 0),s=Object(n.useRef)(void 0),r=Object(n.useRef)(void 0);return Object(n.useEffect)((function(){return e.addGameStateListenerEffect(t)}),[e,t]),Object(n.useEffect)((function(){return e.addGameStateListenerEffect(i)}),[e,i]),Object(n.useEffect)((function(){return e.addGameStateListenerEffect(s)}),[e,s]),Object(n.useEffect)((function(){return e.addGameStateListenerEffect(r)}),[e,r]),a.a.createElement("div",{className:"fullscreen"},a.a.createElement(K,{outRef:t}),a.a.createElement(q,{onGetMessage:function(e){return e.winner?"".concat(e.winner.name," wins!"):""},outRef:r}),a.a.createElement($,{game:e}),a.a.createElement(J,{position:"left",player:e.players[1],outRef:i}),a.a.createElement(J,{position:"right",player:e.players[2],outRef:s}))};r.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(Q,null)),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.e673be25.chunk.js.map