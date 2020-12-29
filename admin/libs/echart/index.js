$(function () {
  const optionList = [];
  init();
  function init() {
    allOrders();
    eventList();
    statistics();
    chineseUsersStatistics();
    sell_counts();
    channel_group_map();
    hotSell();
  }
  $(window).resize(function () {
    console.log("变");
    optionList.forEach(v => v.resize())
  })

  // 全国销量
  function allOrders() {
    var data = [
      ['20,301,987', '99834'],
      ['301,987', '9834'],
      ['1,987', '3834'],
      ['987', '834']
    ];
    let currentIndex = 0;
    let timeId = -1;

    $(".device_order_row1>div").click(function () {
      const index = $(this).index(".device_order_row1>div");
      setAnimateByIndex(index);
      clearInterval(timeId);
      setIntervalAnimation();
    });

    setIntervalAnimation();



    function setIntervalAnimation() {
      timeId = setInterval(() => {
        currentIndex++;
        if (currentIndex >= data.length) {
          currentIndex = 0;
        }
        setAnimateByIndex(currentIndex);

      }, 1000);

    }
    function setAnimateByIndex(index) {
      $(".device_order_row1>div").eq(index).addClass("active").siblings().removeClass("active");
      $(".device_order_row2>span").eq(0).text(data[index][0]);
      $(".device_order_row2>span").eq(1).text(data[index][1]);
    }
  }


  function eventList() {
    // 故障设备
    $(".fault_device span").click(function () {
      $(this).addClass("active").siblings().removeClass("active");
    })
  }

  // 点位分布统计
  function statistics() {
    optionList.push(echarts.init($("#statistics_chart")[0]));

    // 指定图表的配置项和数据
    var option = {
      color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['10%', '70%'],
          center: ['50%', '50%'],
          data: [
            { value: 20, name: '云南' },
            { value: 26, name: '北京' },
            { value: 24, name: '山东' },
            { value: 25, name: '河北' },
            { value: 20, name: '江苏' },
            { value: 25, name: '浙江' },
            { value: 30, name: '四川' },
            { value: 42, name: '湖北' }
          ],
          roseType: 'area',
          labelLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ]
    };

    optionList[0].setOption(option);
  }

  // 全国用户总量统计
  function chineseUsersStatistics() {
    var item = {
      name: '',
      value: 1200,
      // 柱子颜色
      itemStyle: {
        color: '#254065'
      },
      // 鼠标经过柱子颜色
      emphasis: {
        itemStyle: {
          color: '#254065'
        }
      },
      // 工具提示隐藏
      tooltip: {
        extraCssText: 'opacity:0'
      }
    }
    var option = {
      grid: {
        // 距离 上右下左 的距离
        top: '3%',
        right: '3%',
        bottom: '3%',
        left: '0%',
        // 是否包含文本
        containLabel: true,
        // 显示边框
        show: true,
        // 边框颜色
        borderColor: 'rgba(0, 240, 255, 0.3)'
      },

      xAxis: {
        type: 'category',
        data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
        axisLabel: {
          color: '#4c9bfd'
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: 'rgba(0, 240, 255, 0.3)'
          }
        },
        axisLabel: {
          color: '#4c9bfd'
        }
      },
      series: [{
        data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240],
        type: 'bar',
        barWidth: '60%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
              { offset: 0, color: '#00fffb' }, // 0 起始颜色
              { offset: 1, color: '#0061ce' }  // 1 结束颜色
            ]
          )
        },
      }]
    };

    optionList.push(echarts.init($('.bar')[0]));
    optionList[1].setOption(option)
  }

  // 销售额统计
  function sell_counts() {
    let index = 0;
    let timeid = 0;
    optionList.push(echarts.init($('.sell_counts_content')[0]))
    const data = [
      [
        [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
        [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
      ],
      [
        [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
        [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
      ],
      [
        [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
        [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
      ],
      [
        [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
        [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
      ]
    ];
    showMap();
    goInterval();
    function showMap() {
      const option = {
        title: {
          subtext: "单位(万)", top: 8, left: 40,
          subtextStyle: {
            color: "#4a97f8"
          }
        },
        legend: {
          data: ['预期销售额', '实际销售额'],
          textStyle: {
            color: "#4a97f8"
          },
          top: 20,
        },
        grid: {
          top:"22%",
          left:"0",
          bottom:"5%",
          containLabel:true
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisLabel: {
            color: "#4a97f8"
          },
        },
        yAxis: {
          type: 'value',
          data: [0, 20, 40, 60, 80, 100],
          axisLabel: {
            color: "#4a97f8"
          },
          splitLine: {
            lineStyle: {
              color: "#4a97f8"
            }
          }
        },
        series: [{
          name: "预期销售额",
          data: data[index][0],
          type: 'line',
          smooth: true,
          lineStyle: {
            color: "red"
          }
        }, {
          name: "实际销售额",
          data: data[index][1],
          type: 'line',
          smooth: true,
          lineStyle: {
            color: "aqua"
          }
        }]
      };
      optionList[2].setOption(option)
    }

    function goInterval() {
      clearInterval(timeid);;
      timeid = setInterval(() => {
        index++;
        if (index >= data.length) {
          index = 0;
        }
        $(".sell_counts_tip").eq(index).addClass("active").siblings("div").removeClass("active");
        showMap();
      }, 2000);
    }
    $(".sell_counts_tip").click(function () {
      index = $(this).index(".sell_counts_tip");
      showMap();
      goInterval();
      $(this).addClass("active").siblings("div").removeClass("active");
    })
  }

  // 一季度销售进度
  function channel_group_map() {
    optionList.push(echarts.init($('.channel_group_map_content')[0]));
    option = {
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['70%', '80%'],
          label: {
            show: false,
            position: 'center'
          },
          data: [
            { value: 50, name: '联盟广告', itemStyle: { color: "#12274d" } },
            { value: 100, name: '视频广告', itemStyle: { color: "transparent" } },
            { value: 50, name: '其他', itemStyle: { color: "#00abd7" } }
          ]
        }
      ]
    };
    optionList[3].setOption(option)
  }

  // 全国热榜
  function hotSell() {
    const data = [
      { name: '可爱多', num: '9,086' },
      { name: '娃哈哈', num: '8,341' },
      { name: '喜之郎', num: '7,407' },
      { name: '八喜', num: '6,080' },
      { name: '小洋人', num: '6,724' },
      { name: '好多鱼', num: '2,170' },
    ];
    const htmlList = data.map(function (item) {
      return `
      <li>
              <div class="left">${item.name}</div>
              <div class="right">
                <span>${item.num} <i class="icon-down"></i> </span>
              </div>
            </li>
      `;

    })
    $(".latest ul").html(htmlList.join(''));

    let index = 0;
    let timeId = 0;
    goInterval();
    function goInterval() {
      clearInterval(timeId);
      timeId = setInterval(() => {
        index++;
        if (index >= $(".province li").length) {
          index = 0;
        }
        $(".province li").eq(index).addClass("active").siblings().removeClass("active");
        $(".latest li:last").prependTo(".latest ul");

      }, 2000);
    }

    $(".province ").on("mouseover", "li", function () {
      const ind = $(this).index();
      $(".province li").eq(ind).addClass("active").siblings().removeClass("active");
      goInterval();

    })

  }
})