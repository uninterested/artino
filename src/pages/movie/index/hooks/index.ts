import {useCallback, useMemo, useState} from 'react';
import {IMovieModel, IPageMethodProps, IPageResultProps} from '../types';
import Toast from '~/uikit/toast';

const usePageHooks = (): [IPageResultProps, IPageMethodProps] => {
  const [data, setData] = useState<IMovieModel[] | undefined>();

  const mockData = useCallback(() => {
    Toast.loading('数据加载中...');
    setTimeout(() => {
      Toast.hide();
      setData([
        {
          id: '0',
          title: '变形金刚：超能勇士崛起',
          icon: 'https://p0.pipi.cn/mmdb/fb7386712c992367cb07acd75f94b0e41c39b.jpg?imageView2/1',
          cover:
            'https://p0.pipi.cn/friday/f9d8208398be7f34c664719c1d88114e.jpg?imageView2/2',
          video:
            'https://vod.pipi.cn/43903a81vodtransgzp1251246104/5f3bd3cc3270835009389936273/v.f42905.mp4',
          stars: 4,
          info: {
            director: '小斯蒂芬·卡普尔',
            year: '2023',
            duration: 128,
          },
          type: ['动作', '科幻', '冒险'],
          describe:
            '二十世纪九十年代，人类考古学家发现了远古时期坠落在地球的超光速钥匙，并无意中激活了它，但却导致一个名为宇宙大帝的邪恶变形金刚降临，企图吞噬地球的能量。宇宙大帝驱使以天灾为首的恐惧兽悄然而至，掀起一场空前的危机，绝境之中，蛰伏许久的巨无霸终觉醒，联合汽车人变形出发，擎天柱与擎天圣强强联手，与天灾领导的恐惧兽小队展开激战 。',
          actor: [
            {
              name: '擎天柱',
              icon: 'https://p0.pipi.cn/friday/6118d422c2507671eed25bc16f3669f2.jpg?imageView2/1',
            },
            {
              name: '擎天圣',
              icon: 'https://p0.pipi.cn/friday/03c02e9227cb8e49a8290a91bc315398.jpg?imageView2/1',
            },
            {
              name: '大黄蜂',
              icon: 'https://p0.pipi.cn/friday/48e38b99dcc1d145c2db17daffeca7b5.jpg?imageView2/1',
            },
            {
              name: '幻影',
              icon: 'https://p0.pipi.cn/friday/46ecd01a85a8ca8a1bd77cabacb79600.jpg?imageView2/1',
            },
            {
              name: '飞箭勇士',
              icon: 'https://p0.pipi.cn/friday/1e98ff1e7b344152ed51b97b05f48044.jpg?imageView2/1',
            },
            {
              name: '阿尔茜',
              icon: 'https://p0.pipi.cn/friday/f69e1d9aa1b97fe7de5329de41c29d16.jpg?imageView2/1',
            },
          ],
        },
        {
          id: '1',
          title: '蜡笔小新：谜团！花之天下春日部学院',
          icon: 'https://p0.pipi.cn/mmdb/d2dad5927a387addd217898d7b16c47528458.jpg?imageView2/1',
          cover:
            'https://p1.meituan.net/movie/0ed22e57b534c1daeb61146dd07399d5372214.jpg',
          video:
            'https://vod.pipi.cn/fec9203cvodtransbj1251246104/fe71f6d05285890817428402990/v.f42906.mp4',
          stars: 3,
          info: {
            director: '高桥涉',
            year: '2021',
            duration: 104,
          },
          type: ['动画'],
          describe:
            '讲述小新等人组成的春日部防卫队受风间之邀，前往一所高档的私立学校体验生活，但风间却在体验入学后不久因奇妙的原因变成了一个“笨蛋”。春日部防卫队将和这所学校的学生会会长一起，克服一道道难题',
          actor: [
            {
              name: '小林由美子',
              icon: 'https://p0.pipi.cn/basicdata/25bfd6d7537c6907ac16bd8d4766c7fc21fa7.jpg?imageView2/1',
            },
            {
              name: '林玉绪',
              icon: 'https://p0.pipi.cn/basicdata/25bfd6d77a302fd7c3537c41b17a8314068e8.jpg?imageView2/1',
            },
            {
              name: '广桥凉',
              icon: 'https://p0.pipi.cn/basicdata/25bfd6d7537c69ecd839dd55739e88a414ae3.jpg?imageView2/1',
            },
            {
              name: '一龙斋贞友',
              icon: 'https://p0.pipi.cn/basicdata/25bfd6d7537c69b8605015b1e61a3dcd878cc.jpg?imageView2/1',
            },
            {
              name: '稻田彻',
              icon: 'https://p0.pipi.cn/basicdata/25bfd6d7537c69300bbe2a841a52b4298602b.jpg?imageView2/1',
            },
            {
              name: '龟井芳子',
              icon: 'https://p0.pipi.cn/basicdata/25bfd6d7537c69af3350c8a5b533043d13c0b.jpg?imageView2/1',
            },
          ],
        },
        {
          id: '2',
          title: '拯救嫌疑人',
          icon: 'https://p0.pipi.cn/mmdb/fb7386920fa3399257b53575e4a7e61da8cd7.png?imageView2/1',
          cover:
            'https://p0.pipi.cn/friday/70990365272702d4d8932aa5b48d0af8.jpg?imageView2/2',
          video:
            'https://vod.pipi.cn/fec9203cvodtransbj1251246104/b482ddf43270835011813156162/v.f42905.mp4',
          stars: 4,
          info: {
            director: '张末',
            year: '2023',
            duration: 119,
          },
          type: ['悬疑', '犯罪', '剧情'],
          describe:
            '“谁动我女儿，我要谁命”愤怒母亲绝望反击！\n独居女大学生被刺27刀惨死，嫌疑人一审被判死刑！受害者母亲林淑娥（惠英红 饰）本以为正义已到，但从无败诉的女律师陈智琪（张小斐 饰）坚持为奸杀犯做无罪辩护，让受害者母亲陷入绝望。陈智琪为奸杀犯辩护的背后也有隐秘苦衷——一通神秘电话威胁她在五天之内为嫌疑人做无罪辨护，否则就杀死她女儿！陈智琪无助绝望之下联手警察金志雄(李鸿其 饰)展开调查，随着调查的展开，陷入绝境的两个母亲形成对峙，更大的阴谋开始展现，复仇与反杀似乎成了唯一的选择……',
          actor: [
            {
              name: '张小斐',
              icon: 'https://p0.pipi.cn/basicdata/25bfd6d77a30e1d7c38ea3bb976b5eaf6058e.jpg?imageView2/1',
            },
            {
              name: '李鸿其',
              icon: 'https://p0.pipi.cn/basicdata/25bfd6d7537c6921f0be120f4c7c0dfc3bf79.jpg?imageView2/1',
            },
            {
              name: '惠英红',
              icon: 'https://p0.pipi.cn/basicdata/25bfd6d753706d51ba537c6ebae79a3cd8ea8.jpg?imageView2/1',
            },
            {
              name: '王子异',
              icon: 'https://p0.pipi.cn/basicdata/fb7386dd87a92316bd9ab4be7ef26d7e09a44.jpg?imageView2/1',
            },
            {
              name: '洪浚嘉',
              icon: 'https://p0.pipi.cn/basicdata/fb7386925bf5bf8077925789eec209c8af537.jpg?imageView2/1',
            },
            {
              name: '尹子维',
              icon: 'https://p0.pipi.cn/basicdata/25bfd6d7537c69537c9ab4bd3c3f7952a08da.jpg?imageView2/1',
            },
          ],
        },
        {
          id: '3',
          title: '夏日友晴天',
          icon: 'https://p0.pipi.cn/mmdb/d2dad5927a39abddd2e19b05cf63c502ea634.jpg?imageView2/1',
          cover:
            'https://p0.meituan.net/movie/cc08369d07fced7cbdf4a92df3fb8cea112960.jpg',
          video:
            'https://vod.pipi.cn/d5457264vodtranscq1251246104/0d17d25f3701925923063276234/v.f42905.mp4',
          stars: 1,
          info: {
            director: '埃里康·卡萨罗萨',
            year: '2021',
            duration: 96,
          },
          type: ['动画', '冒险', '喜剧'],
          describe:
            '故事发生在20世纪50年代，意大利一个虚构的海滨小镇维埃拉。镇上的居民以捕鱼为生，有渔民表示看到有海怪出现，于是发起了猎捕海怪的行动。小海怪卢卡 （雅各布·特伦布莱 配）与父母和奶奶在海底过着平静的生活，父母经常叮嘱卢卡不要到海面上玩耍，因为人类都是坏人。但卢卡对海面之上的世界充满好奇，有一天，他遇到一个名叫阿贝托 （ 杰克·迪伦·格雷泽 配）的小海怪。阿尔贝托在一处无人海滩的废弃房子里生活，在阿尔贝托的带领下，卢卡也偷偷跑到海滩上。小海怪一离开水就自动变成人类小孩的模样，但一碰到水则立刻现原形。卢卡和阿尔贝托越玩越开心，甚至跑到维埃拉冒险，他们在那里认识了活泼的小女孩茱莉娅 （艾玛·伯曼 配），三人组成一队，准备参加小岛上的吃意面、骑单车、游泳竞赛。他们要面对的不仅是镇上恶霸男孩的挑衅，两个小海怪还要一边隐藏身份，一边躲避同样变成人类到镇上寻找他们的卢卡父母。在这段冒险过程中，卢卡和阿尔贝托的友情得到考验，卢卡的求知欲也越来越大，身为海怪的他们最终能否活出真我，实现探索世界的梦想。',
          actor: [
            {
              name: '雅各布·特瑞布雷',
              icon: 'https://p0.pipi.cn/basicdata/25bfd6d7537e7a3ba3c696200e927130ae96e.jpg?imageView2/1',
            },
            {
              name: '杰克·迪伦·格雷泽',
              icon: 'https://p0.pipi.cn/basicdata/25bfd6d7537e7a395b300b1cabd484a2c60ed.jpg?imageView2/1',
            },
            {
              name: '艾玛·伯曼',
              icon: 'https://p0.pipi.cn/basicdata/25bfd6d77a333957e211e5a982ab73bebd789.jpg?imageView2/1',
            },
            {
              name: '萨维里奥·雷蒙多',
              icon: 'https://p0.pipi.cn/basicdata/25bfd6d7537e7af0eebe2a71de0fc09fc39f2.jpg?imageView2/1',
            },
            {
              name: '玛娅·鲁道夫',
              icon: 'https://p0.pipi.cn/basicdata/25bfd6d753706d9235f2aaa7443c013e78403.jpg?imageView2/1',
            },
            {
              name: '萨莎·拜伦·科恩',
              icon: 'https://p0.pipi.cn/basicdata/25bfd6d7537c69d236f0ee15f6e0d4f4aef41.jpg?imageView2/1',
            },
          ],
        },
      ]);
    }, (Math.random() * 2000) << 0);
  }, []);

  return [{data}, {mockData}];
};

export default usePageHooks;
