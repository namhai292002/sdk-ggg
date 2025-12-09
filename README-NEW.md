# 🛒 Shopping Cart SDK

Advanced shopping cart SDK với Shadow DOM, dynamic config, và multi-theme support - tương tự Shopify Buy Button.

## ✨ Tính năng

- ✅ **Shadow DOM**: CSS hoàn toàn tách biệt, không xung đột với website
- ✅ **Dynamic Config**: Truyền config qua data-attributes hoặc JavaScript
- ✅ **Multi-theme**: 4 themes màu (purple, blue, green, red)
- ✅ **Flexible Position**: 4 vị trí nút floating
- ✅ **Multi-currency**: Hỗ trợ mọi loại tiền tệ và locale
- ✅ **Widget Mode**: Render vào div cụ thể
- ✅ **Public API**: Control SDK từ JavaScript
- ✅ **Mobile Ready**: Tương thích WebView

## 🚀 Cài đặt

### Cách 1: Load script trực tiếp (giống Shopify)

```html
<script 
  src="https://your-cdn.com/embed.js"
  data-site-id="my-store"
  data-theme="purple"
  data-position="bottom-right"
  data-currency="VND"
  data-locale="vi-VN"
></script>
```

### Cách 2: Khởi tạo bằng JavaScript

```javascript
// Tạo instance mới
const sdk = YourSDKManager.getInstance().createInstance({
  siteId: 'my-store',
  theme: 'blue',
  position: 'bottom-right',
  currency: 'USD',
  locale: 'en-US',
  showFloatingButton: true
});

// Thêm sản phẩm
sdk.addToCart('Product Name', 99.99);
```

### Cách 3: Render widget vào div

```html
<div id="my-cart-widget"></div>

<script src="https://your-cdn.com/embed.js"></script>
<script>
  YourSDKManager.getInstance().createInstance({
    siteId: 'widget-demo',
    container: 'my-cart-widget',
    showFloatingButton: false
  });
</script>
```

## 📖 Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `siteId` | string | 'default' | Unique identifier cho SDK instance |
| `theme` | 'purple' \| 'blue' \| 'green' \| 'red' | 'purple' | Theme màu sắc |
| `position` | 'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left' | 'bottom-right' | Vị trí nút floating |
| `currency` | string | 'VND' | Loại tiền tệ (ISO 4217) |
| `locale` | string | 'vi-VN' | Locale cho format tiền tệ |
| `showFloatingButton` | boolean | true | Hiển thị nút floating |
| `container` | string | undefined | ID của div để render widget |

## 🎮 Public API

```javascript
// Lấy SDK instance
const sdk = window.YourSDK;

// Thêm sản phẩm vào giỏ
sdk.addToCart(name: string, price: number);

// Mở giỏ hàng
sdk.openCart();

// Đóng giỏ hàng
sdk.closeCart();

// Lấy danh sách sản phẩm trong giỏ
const cart = sdk.getCart();

// Lấy tổng tiền
const total = sdk.getTotal();

// Xóa giỏ hàng
sdk.clearCart();
```

## 📱 Mobile App Integration

### Android WebView

```java
WebView webView = new WebView(context);
webView.getSettings().setJavaScriptEnabled(true);
webView.loadUrl("https://yoursite.com/cart-page");
```

### iOS WKWebView

```swift
let webView = WKWebView()
let url = URL(string: "https://yoursite.com/cart-page")!
webView.load(URLRequest(url: url))
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Test local
npx http-server -p 8080
```

## 📦 Deploy

Deploy lên Cloudflare Pages:

1. Push code lên GitHub
2. Kết nối với Cloudflare Pages
3. Build command: `npm run build`
4. Build output: `dist`

## 🎨 Demo

- `demo.html` - Demo cơ bản với Shopify integration
- `demo-advanced.html` - Demo nâng cao với multiple configs

## 📄 License

MIT
