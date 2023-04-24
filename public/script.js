import { Scuti } from '../src/Scuti';
import { Room } from '../src/objects/rooms/Room';
import { FloorMaterial } from '../src/objects/rooms/materials/FloorMaterial';
import { WallMaterial } from '../src/objects/rooms/materials/WallMaterial';
import { Avatar } from '../src/objects/avatars/Avatar';
import { AvatarAction } from '../src/objects/avatars/actions/AvatarAction';

(async () => {
  const renderer = new Scuti({
    canvas: document.getElementById('app'),
    width: window.innerWidth,
    height: window.innerHeight,
    resources: './resources'
  });
  await renderer.loadResources();

  const tileMap =
    'x0000000000000000x\n' +
    'x0000000000000000x\n' +
    'x0000000000000000x\n' +
    '00000000000000000x\n' +
    'x0000000000000000x\n' +
    'x0000000000000000x\n' +
    'x0000000000000000x\n' +
    'x0000000000000000x\n' +
    'x0000000000000000x\n' +
    'x0000000000000000x\n';

  const room = new Room(renderer, {
    tileMap: tileMap,
    /*floorMaterial: new FloorMaterial(renderer, 110),
        wallMaterial: new WallMaterial(renderer, 1501)*/
    //floorMaterial: new FloorMaterial(renderer, 307),
    floorMaterial: new FloorMaterial(renderer, 110),
    wallMaterial: new WallMaterial(renderer, 1601)
  });
  avatar(room, 2, 1, 0, 0);
  avatar(room, 4, 1, 0, 1);
  avatar(room, 6, 1, 0, 2);
  avatar(room, 8, 1, 0, 3);
  avatar(room, 10, 1, 0, 4);
  avatar(room, 12, 1, 0, 5);
  avatar(room, 14, 1, 0, 6);
  avatar(room, 16, 1, 0, 7);
})();

function avatar(room, x, y, z, direction) {
  const avatar = new Avatar({
    figure: 'hr-100-61.hd-180-7.ch-210-66.lg-270-82.sh-290-80',
    position: {
      x: x,
      y: y,
      z: z
    },
    bodyDirection: direction,
    headDirection: direction,
    actions: [AvatarAction.Talk, AvatarAction.Wave, AvatarAction.Walk, AvatarAction.CarryItem],
    handItem: 55
  });
  room.objects.add(avatar);
}
