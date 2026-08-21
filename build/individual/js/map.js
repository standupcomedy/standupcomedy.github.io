const initMap = async () => {
  const { Map } = await google.maps.importLibrary("maps")
  const { AdvancedMarkerElement: _AdvancedMarkerElement } = await google.maps.importLibrary("marker")

  ls_standup.map = ls_standup.map || {}

  let lat = ls_standup.map.lat || 35.706000562480696,
      lng = ls_standup.map.lng || 139.6543659883582

  // 地図表示
  MAP.advaned_marker = _AdvancedMarkerElement

  MAP.gmap = new Map(document.getElementById("gmap"), {
    center: { lat, lng },
    zoom: 15,
    disableDefaultUI: true,
    clickableIcons: false,
    mapId: '34927e09452c1d2aa7aea4e9'
  })

  MAP.getCenterAfterChanged((lat, lng) => {
    ls_standup.map.lat = lat
    ls_standup.map.lng = lng
    Fn.storageLS('standup', ls_standup)
  })
}

$(() => {
  async function initist() {

    // リスト表示
    const [listData] = await Fn.loadJsonMultiple([
      './assets/data/current/list.json'
    ])

    // ガード
    if (!listData) {
      return false
    }

    // 会期終了のデータを除外し、上書きする
    JSON_DATA = listData.filter(d => {
      return !(d.end && Fn.isPastDate(d.end))
    })

    // HTMLをセットする
    $('.js-hit-total').html(JSON_DATA.length)

    // URLパラメータに詳細情報がある場合
    const param_slug = getParam('slug'),
          param_lat = getParam('lat'),
          param_lng = getParam('lng')

    const init_data = JSON_DATA.find(d => d.slug === param_slug)

    if (init_data) {
      setList()
      setDetail(init_data.id, init_data.slug)
    } else if (param_lat && param_lng) {
      setList()
      MAP.panTo(param_lat, param_lng)
    } else {
      setList({ lat, lng })
      ;(async () => {
        try {
          const address = await MAP.getAddressFromLatLng(lat, lng)

          $('.js-sort').html(address.str + '付近')
        } catch (err) {
          $('.js-sort').html('地図中心周辺')
        }
      })()
    }
  }
})