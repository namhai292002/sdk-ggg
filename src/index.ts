
console.log("YourSDK loaded");

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

class ShoppingCartSDK {
  private cart: CartItem[] = [];
  private isPopupOpen = false;
  private container: HTMLElement | null = null;

  constructor() {
    this.init();
  }

  private init() {
    // Inject styles
    this.injectStyles();
    
    // Create floating button
    this.createFloatingButton();
    
    // Create popup
    this.createPopup();
  }

  private injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .sdk-floating-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        z-index: 9998;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .sdk-floating-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(0,0,0,0.25);
      }
      .sdk-cart-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background: #ff4757;
        color: white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
      }
      .sdk-popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
        display: none;
        align-items: center;
        justify-content: center;
      }
      .sdk-popup-overlay.active {
        display: flex;
      }
      .sdk-popup {
        background: white;
        border-radius: 12px;
        width: 90%;
        max-width: 500px;
        max-height: 80vh;
        overflow: hidden;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
      }
      .sdk-popup-header {
        padding: 20px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }
      .sdk-popup-header h2 {
        margin: 0;
        font-size: 20px;
      }
      .sdk-close-btn {
        background: transparent;
        border: none;
        color: white;
        font-size: 28px;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .sdk-popup-body {
        padding: 20px;
        overflow-y: auto;
        flex: 1;
      }
      .sdk-cart-empty {
        text-align: center;
        padding: 40px 20px;
        color: #999;
      }
      .sdk-cart-item {
        display: flex;
        gap: 15px;
        padding: 15px;
        border: 1px solid #eee;
        border-radius: 8px;
        margin-bottom: 10px;
        transition: box-shadow 0.2s;
      }
      .sdk-cart-item:hover {
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      .sdk-item-info {
        flex: 1;
      }
      .sdk-item-name {
        font-weight: bold;
        margin-bottom: 5px;
      }
      .sdk-item-price {
        color: #667eea;
        font-weight: bold;
      }
      .sdk-item-controls {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .sdk-qty-btn {
        width: 30px;
        height: 30px;
        border: 1px solid #ddd;
        background: white;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
      }
      .sdk-qty-btn:hover {
        background: #f5f5f5;
      }
      .sdk-remove-btn {
        background: #ff4757;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
      }
      .sdk-popup-footer {
        padding: 20px;
        border-top: 1px solid #eee;
        background: #f9f9f9;
      }
      .sdk-total {
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
      }
      .sdk-checkout-btn {
        width: 100%;
        padding: 15px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: transform 0.2s;
      }
      .sdk-checkout-btn:hover {
        transform: translateY(-2px);
      }
      .sdk-add-demo-btn {
        margin-bottom: 15px;
        padding: 12px;
        background: #2ecc71;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        width: 100%;
      }
    `;
    document.head.appendChild(style);
  }

  private createFloatingButton() {
    const btn = document.createElement('button');
    btn.className = 'sdk-floating-btn';
    btn.innerHTML = '🛒<span class="sdk-cart-badge">0</span>';
    btn.onclick = () => this.togglePopup();
    document.body.appendChild(btn);
  }

  private createPopup() {
    const overlay = document.createElement('div');
    overlay.className = 'sdk-popup-overlay';
    overlay.innerHTML = `
      <div class="sdk-popup">
        <div class="sdk-popup-header">
          <h2>🛒 Giỏ hàng của bạn</h2>
          <button class="sdk-close-btn">&times;</button>
        </div>
        <div class="sdk-popup-body">
          <button class="sdk-add-demo-btn">+ Thêm sản phẩm mẫu</button>
          <div class="sdk-cart-list"></div>
        </div>
        <div class="sdk-popup-footer">
          <div class="sdk-total">
            <span>Tổng cộng:</span>
            <span class="sdk-total-amount">0đ</span>
          </div>
          <button class="sdk-checkout-btn">Thanh toán</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Event listeners
    overlay.querySelector('.sdk-close-btn')?.addEventListener('click', () => this.togglePopup());
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.togglePopup();
    });
    overlay.querySelector('.sdk-checkout-btn')?.addEventListener('click', () => this.checkout());
    overlay.querySelector('.sdk-add-demo-btn')?.addEventListener('click', () => this.addDemoProduct());
    
    this.container = overlay;
  }

  private togglePopup() {
    this.isPopupOpen = !this.isPopupOpen;
    this.container?.classList.toggle('active', this.isPopupOpen);
    if (this.isPopupOpen) {
      this.renderCart();
    }
  }

  private addDemoProduct() {
    const demoProducts = [
      { name: 'Áo thun', price: 150000 },
      { name: 'Quần jean', price: 350000 },
      { name: 'Giày thể thao', price: 500000 },
      { name: 'Túi xách', price: 250000 },
      { name: 'Mũ lưỡi trai', price: 100000 }
    ];
    
    const product = demoProducts[Math.floor(Math.random() * demoProducts.length)];
    this.addToCart(product.name, product.price);
  }

  public addToCart(name: string, price: number) {
    const existingItem = this.cart.find(item => item.name === name);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({
        id: Date.now(),
        name,
        price,
        quantity: 1
      });
    }
    
    this.updateBadge();
    this.renderCart();
  }

  private removeFromCart(id: number) {
    this.cart = this.cart.filter(item => item.id !== id);
    this.updateBadge();
    this.renderCart();
  }

  private updateQuantity(id: number, delta: number) {
    const item = this.cart.find(item => item.id === id);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeFromCart(id);
      } else {
        this.renderCart();
      }
    }
  }

  private updateBadge() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.querySelector('.sdk-cart-badge');
    if (badge) {
      badge.textContent = totalItems.toString();
    }
  }

  private renderCart() {
    const cartList = this.container?.querySelector('.sdk-cart-list');
    if (!cartList) return;

    if (this.cart.length === 0) {
      cartList.innerHTML = '<div class="sdk-cart-empty">Giỏ hàng trống<br>👆 Thêm sản phẩm mẫu để test</div>';
    } else {
      cartList.innerHTML = this.cart.map(item => `
        <div class="sdk-cart-item">
          <div class="sdk-item-info">
            <div class="sdk-item-name">${item.name}</div>
            <div class="sdk-item-price">${this.formatPrice(item.price)}</div>
          </div>
          <div class="sdk-item-controls">
            <button class="sdk-qty-btn" data-id="${item.id}" data-action="decrease">-</button>
            <span>${item.quantity}</span>
            <button class="sdk-qty-btn" data-id="${item.id}" data-action="increase">+</button>
            <button class="sdk-remove-btn" data-id="${item.id}">Xóa</button>
          </div>
        </div>
      `).join('');

      // Add event listeners
      cartList.querySelectorAll('.sdk-qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          const id = parseInt(target.dataset.id || '0');
          const action = target.dataset.action;
          this.updateQuantity(id, action === 'increase' ? 1 : -1);
        });
      });

      cartList.querySelectorAll('.sdk-remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          const id = parseInt(target.dataset.id || '0');
          this.removeFromCart(id);
        });
      });
    }

    // Update total
    const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalElement = this.container?.querySelector('.sdk-total-amount');
    if (totalElement) {
      totalElement.textContent = this.formatPrice(total);
    }
  }

  private formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  }

  private checkout() {
    if (this.cart.length === 0) {
      alert('Giỏ hàng trống!');
      return;
    }
    
    const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thanh toán thành công!\nTổng: ${this.formatPrice(total)}`);
    this.cart = [];
    this.updateBadge();
    this.renderCart();
  }
}

// Initialize SDK
(function() {
  const scriptEl = document.currentScript;
  const siteId = scriptEl?.getAttribute("data-site-id") || "default";
  
  console.log("Shopping Cart SDK initialized for site:", siteId);
  
  // Create instance and expose to window
  (window as any).YourSDK = new ShoppingCartSDK();
})();
