import {useCallback, useMemo, useRef, useState} from 'react';
import {IMovieModel, IPageMethodProps, IPageResultProps} from '../types';
import Toast from '~/uikit/toast';
import {themeState} from '~/recoil-state/theme';
import {useRecoilValue} from 'recoil';
import {throttle} from 'lodash';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {LayoutChangeEvent, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TNavigation} from '~/router/stacks';
import {wp} from '~/utils/responsive';

const usePageHooks = (): [IPageResultProps, IPageMethodProps] => {
  const navigation = useNavigation() as TNavigation;
  const state = useRecoilValue(themeState);
  // 滑动的进度值
  const progress = useRef<number>(0);
  // 开始滑动的进度值
  const startProgress = useRef<number>(0);
  // 展示背景图的索引
  const [coverIndex, setCoverIndex] = useState<string>('');
  // item layout
  const layoutRef = useRef<IPosition>();
  // 当前激活的tab的索引
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // view的ref，用于获取在屏幕的位置
  const viewRef = useRef<View>(null);

  const layoutValues = useMemo(() => {
    const itemWidth = wp(50);
    const itemHeight = wp(95);
    const centerOffset = wp(25);
    const offsetX = wp(15);
    return {
      itemWidth,
      itemHeight,
      centerOffset,
      offsetX,
    };
  }, []);

  const sharedValue = useRef([
    useSharedValue(0),
    useSharedValue(1),
    useSharedValue(0),
  ]);

  const sharedStyle = useRef(
    sharedValue.current.map(value =>
      useAnimatedStyle(() => {
        return {opacity: value.value};
      }),
    ),
  );

  const colors = useMemo(() => {
    return state === 'dark'
      ? ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']
      : ['rgba(70, 70, 70, 0)', 'rgba(70, 70, 70, 1)'];
  }, [state]);

  const [data, setData] = useState<IMovieModel[] | undefined>();

  const animationStyle = useCallback(
    (value: number) => {
      'worklet';

      const itemGap = interpolate(
        value,
        [-3, -2, -1, 0, 1, 2, 3],
        [
          layoutValues.offsetX * -2,
          -layoutValues.offsetX,
          0,
          0,
          0,
          layoutValues.offsetX,
          layoutValues.offsetX * 2,
        ],
      );

      const translateX =
        interpolate(
          value,
          [-1, 0, 1],
          [-layoutValues.itemWidth * 1.2, 0, layoutValues.itemWidth * 1.2],
        ) +
        layoutValues.centerOffset -
        itemGap;

      const translateY = interpolate(
        value,
        [-1, -0.5, 0, 0.5, 1],
        [65, 25, 20, 25, 65],
      );

      const scale = interpolate(
        value,
        [-1, -0.5, 0, 0.5, 1],
        [0.74, 0.8, 1, 0.8, 0.74],
      );

      return {
        transform: [
          {
            translateX,
          },
          {
            translateY,
          },
          {scale},
        ],
      };
    },
    [layoutValues.centerOffset],
  );

  /**
   * 模拟数据
   * @returns
   */
  const mockData = (): Promise<IMovieModel[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
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
        ]);
      }, (800 + Math.random() * 1000) << 0);
    });
  };

  /**
   * 初始化
   */
  const init = useCallback(async () => {
    Toast.loading('数据加载中...');
    const result = await mockData();
    Toast.hide();
    setCoverIndex([result.length - 1, 0, 1].join(','));
    setData(result);
  }, []);

  /**
   * 滚动
   * @param percent
   */
  const onScroll = (percent: number) => {
    // 赋值
    progress.current = percent;
    const startValue = startProgress.current;
    let per = Math.abs(percent - startValue);
    let swipeTo: 'left' | 'right';
    if (per > 1) {
      // 跨页了，如从3直接返回0
      if (startValue === 0) swipeTo = 'right';
      else swipeTo = 'left';
    } else swipeTo = percent > startValue ? 'left' : 'right';
    if (swipeTo === 'left') {
      // 向左滑动
      sharedValue.current[0].value = 0;
      sharedValue.current[1].value = 1 - per;
      sharedValue.current[2].value = per;
    } else {
      // 向右滑动
      if (per > 1) {
        per = per - Math.floor(per);
        sharedValue.current[0].value = 1 - per;
        sharedValue.current[1].value = per;
      } else {
        sharedValue.current[0].value = per;
        sharedValue.current[1].value = 1 - per;
      }
      sharedValue.current[2].value = 0;
    }
  };

  /**
   * 开始滚动
   */
  const onScrollBegin = useCallback(() => {
    startProgress.current = progress.current;
    const idx = Math.round(progress.current);
    const min = idx - 1;
    const max = idx + 1;
    const len = data?.length ?? 0;
    const indexString = [
      min < 0 ? len - 1 : min,
      idx,
      max >= len ? 0 : max,
    ].join(',');
    if (indexString !== coverIndex) setCoverIndex(indexString);
  }, [progress, data, coverIndex]);

  /**
   * item click
   */
  const onItemClick = useCallback(
    (item: IMovieModel) => {
      return throttle(
        () => {
          navigation.navigate('MovieDetail', {
            animated: false,
            gestureEnabled: false,
            id: item.id,
            item,
            position: layoutRef.current,
          });
        },
        300,
        {leading: true, trailing: false},
      );
    },
    [layoutRef],
  );

  const onItemLayout = useCallback(() => {
    return (e: LayoutChangeEvent) => {
      setTimeout(() => {
        viewRef.current?.measure((x, y, width, height, pageX, pageY) => {
          layoutRef.current = {
            left: pageX,
            top: pageY,
            width: width,
            height: height,
          };
        });
      }, 500);
    };
  }, []);

  /**
   * 滚动结束
   */
  const onScrollEnd = useCallback(
    (index: number) => {
      if (activeIndex === index) return;
      setActiveIndex(index);
    },
    [activeIndex],
  );

  // return hooks
  return [
    {
      data,
      colors,
      sharedStyle,
      coverIndex,
      viewRef,
      activeIndex,
      animationStyle,
      layoutValues,
    },
    {init, onScroll, onScrollBegin, onScrollEnd, onItemClick, onItemLayout},
  ];
};

export default usePageHooks;
