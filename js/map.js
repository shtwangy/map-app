/* 地図の初期化 */
// Mapbox アクセストークン
import config from "./config.js";
mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;
// MapFanAPI 関連
var resolution = window.devicePixelRatio > 1 ? 2 : 1;
var style = `${config.ASSETS_URL}/mapbox/mb-styles/style.std-pc-ja-${resolution}.json`;

// 地図オブジェクト初期設定とコントロール追加
var map = new mapboxgl.Map({
	container: 'map', // container id
	style: style,
	center: [139.7672311841094, 35.681195934673795], // 初期位置 [経度, 緯度]
	zoom: 12,
	maxZoom: 20,
	minZoom: 5,
	hash: false,
	dragRotate: false
});

/* 地図コントロール */
// マウスの右クリックによる地図回転を無効
map.dragRotate.disable();
// スマホ等のタッチジェスチャーによる地図回転を無効
map.touchZoomRotate.disableRotation();
// 拡縮・方位ボタン
map.addControl (new mapboxgl.NavigationControl ())
// スケール表示
map.addControl (new mapboxgl.ScaleControl ())
// 全画面表示ボタン
map.addControl(new mapboxgl.FullscreenControl);

// 地図操作
map.on('load', function() {
	// 表示地図のサイズは以下で取得可能
	var mapWidth = map.getContainer().offsetWidth
	var mapHeight = map.getContainer().offsetHeight
	// console.log(mapWidth + "," + mapHeight);
});

// クリックイベント
map.on('click', function(e) {
	// ログ
	// console.log(e);

	// 経緯度は e.lngLat, クリック位置は e.point で取得可能
	// console.log(e.lngLat);
	// console.log(e.point);
	// XY ⇒ 経緯度の変換は以下の通り
	// console.log(map.unproject(e.point));

	console.log(`緯度：${e.lngLat.lat}`);
	console.log(`経度：${e.lngLat.lng}`);
});

// 右クリック処理
map.on('contextmenu', function(e) {
	// ログ
	// console.log(e);
});

// マウスカーソル関連テスト
map.on('mousemove', function(e) {
	// ログ
	// console.log(e);
});

const showToast = (elementId, message) => {
	const addBtn = document.getElementById(elementId);
	if (addBtn) {
		addBtn.addEventListener('click', () => {
			M.toast({
				html: message,
				displayLength: 3000
			});
		});
	}
};

showToast('add-btn', 'ポイントを追加します');
showToast('delete-btn', 'ポイントを削除します');
showToast('refresh-btn', 'ポイントをリフレッシュします');
showToast('login-btn', 'ログインします');
