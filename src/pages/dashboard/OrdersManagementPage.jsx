import { useState } from 'react'
import { formatPrice } from '../../utils/formatPrice'
import '../../styles/Dashboard/OrdersManagementPage.css'

/* ══════════════════════════════════════
   MOCK DATA
══════════════════════════════════════ */
const WILAYAS = [
  'الجزائر العاصمة','وهران','قسنطينة','عنابة','بشار','سطيف',
  'باتنة','بجاية','تيزي وزو','تلمسان','ورقلة','أدرار','تامنغست',
]

const DELIVERY_TYPES = {
  home:   { label: 'توصيل للمنزل',   price: 600  },
  office: { label: 'توصيل للمكتب',   price: 400  },
  stop:   { label: 'نقطة استلام',     price: 350  },
}

const initialOrders = [
  {
    id: '#BLZ-1001',
    createdAt: '2026-06-06 10:32',
    customer: { name: 'فاطمة الزهراء بن علي', phone: '0550123456', wilaya: 'الجزائر العاصمة' },
    products: [
      { name: 'كريم مرطب فاخر', qty: 2, price: 2500 },
      { name: 'سيروم فيتامين C', qty: 1, price: 7200 },
    ],
    delivery: 'home',
    status: 'تم التسليم',
    note: '',
  },
  {
    id: '#BLZ-1002',
    createdAt: '2026-06-06 11:15',
    customer: { name: 'أمينة كريم بوعلام', phone: '0661987654', wilaya: 'وهران' },
    products: [
      { name: 'زيت الأرغان الطبيعي', qty: 1, price: 4800 },
    ],
    delivery: 'office',
    status: 'في التوصيل',
    note: 'الرجاء الاتصال قبل التوصيل',
  },
  {
    id: '#BLZ-1003',
    createdAt: '2026-06-06 12:00',
    customer: { name: 'سارة مزيان', phone: '0770456789', wilaya: 'قسنطينة' },
    products: [
      { name: 'قناع الطين الأبيض', qty: 3, price: 1800 },
    ],
    delivery: 'stop',
    status: 'قيد التأكيد',
    note: '',
  },
  {
    id: '#BLZ-1004',
    createdAt: '2026-06-05 09:20',
    customer: { name: 'نور الهدى بلقاسم', phone: '0555321654', wilaya: 'بشار' },
    products: [
      { name: 'كريم واقي الشمس SPF50', qty: 2, price: 3200 },
      { name: 'مزيل مكياج لطيف',       qty: 1, price: 2100 },
    ],
    delivery: 'home',
    status: 'ملغي',
    note: 'الزبونة ألغت الطلب',
  },
  {
    id: '#BLZ-1005',
    createdAt: '2026-06-05 14:45',
    customer: { name: 'ياسمين عيسى', phone: '0699654321', wilaya: 'عنابة' },
    products: [
      { name: 'سيروم فيتامين C', qty: 2, price: 7200 },
    ],
    delivery: 'office',
    status: 'تم التسليم',
    note: '',
  },
  {
    id: '#BLZ-1006',
    createdAt: '2026-06-04 16:10',
    customer: { name: 'حنان بوزيد', phone: '0551789012', wilaya: 'سطيف' },
    products: [
      { name: 'كريم مرطب فاخر', qty: 1, price: 2500 },
    ],
    delivery: 'home',
    status: 'تم التأكيد',
    note: '',
  },
  {
    id: '#BLZ-1007',
    createdAt: '2026-06-04 08:55',
    customer: { name: 'إيمان بن شريف', phone: '0662345678', wilaya: 'باتنة' },
    products: [
      { name: 'زيت الأرغان الطبيعي', qty: 2, price: 4800 },
      { name: 'قناع الطين الأبيض',   qty: 2, price: 1800 },
    ],
    delivery: 'stop',
    status: 'في التوصيل',
    note: '',
  },
]

/* ══════════════════════════════════════
   CONSTANTS
══════════════════════════════════════ */
const ALL_STATUSES = ['قيد التأكيد', 'تم التأكيد', 'في التوصيل', 'تم التسليم', 'ملغي']

const STATUS_META = {
  'قيد التأكيد': { cls: 'badge--pending',   step: 0 },
  'تم التأكيد':  { cls: 'badge--confirmed',  step: 1 },
  'في التوصيل':  { cls: 'badge--shipping',   step: 2 },
  'تم التسليم':  { cls: 'badge--delivered',  step: 3 },
  'ملغي':        { cls: 'badge--cancelled',  step: -1 },
}

/* ══════════════════════════════════════
   HELPERS
══════════════════════════════════════ */
function calcSubtotal(products) {
  return products.reduce((s, p) => s + p.price * p.qty, 0)
}
function calcTotal(products, delivery) {
  return calcSubtotal(products) + (DELIVERY_TYPES[delivery]?.price || 0)
}

/* ══════════════════════════════════════
   ICONS
══════════════════════════════════════ */
const IconSearch = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)
const IconPhone = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.98-.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)
const IconLocation = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)
const IconTruck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
)
const IconEye = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)
const IconEdit = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)
const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const IconNote = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
)
const IconCopy = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
)

/* ══════════════════════════════════════
   ORDER DETAIL MODAL
══════════════════════════════════════ */
function OrderDetailModal({ order, onClose, onStatusChange }) {
  const [copied, setCopied] = useState(false)
  const subtotal      = calcSubtotal(order.products)
  const deliveryPrice = DELIVERY_TYPES[order.delivery]?.price || 0
  const total         = subtotal + deliveryPrice
  const isCancelled   = order.status === 'ملغي'
  const currentStep   = STATUS_META[order.status]?.step ?? 0

  const STEPS = ['قيد التأكيد', 'تم التأكيد', 'في التوصيل', 'تم التسليم']

  function copyPhone() {
    navigator.clipboard.writeText(order.customer.phone)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="order-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="order-modal__header">
          <div>
            <h2 className="order-modal__title">تفاصيل الطلب</h2>
            <span className="order-modal__id">{order.id}</span>
          </div>
          <button className="order-modal__close" onClick={onClose}><IconClose /></button>
        </div>

        <div className="order-modal__body">

          {/* Progress Tracker */}
          {!isCancelled && (
            <div className="order-progress">
              {STEPS.map((step, i) => (
                <div key={step} className={`order-progress__step ${i <= currentStep ? 'order-progress__step--done' : ''}`}>
                  <div className="order-progress__dot">
                    {i <= currentStep && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                        <polyline points="20,6 9,17 4,12"/>
                      </svg>
                    )}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`order-progress__line ${i < currentStep ? 'order-progress__line--done' : ''}`} />
                  )}
                  <span className="order-progress__label">{step}</span>
                </div>
              ))}
            </div>
          )}

          {isCancelled && (
            <div className="order-cancelled-banner">
              <span>✕ هذا الطلب تم إلغاؤه</span>
              {order.note && <span className="order-cancelled-banner__note"> — {order.note}</span>}
            </div>
          )}

          {/* Two columns */}
          <div className="order-modal__grid">

            {/* Customer Info */}
            <div className="order-modal__section">
              <h4 className="order-modal__section-title">معلومات الزبون</h4>
              <div className="order-info-card">
                <div className="order-info-card__avatar">
                  {order.customer.name.charAt(0)}
                </div>
                <div className="order-info-card__details">
                  <p className="order-info-card__name">{order.customer.name}</p>
                  <div className="order-info-card__row">
                    <IconPhone />
                    <span>{order.customer.phone}</span>
                    <button className="copy-btn" onClick={copyPhone} title="نسخ الرقم">
                      {copied ? '✓' : <IconCopy />}
                    </button>
                  </div>
                  <div className="order-info-card__row">
                    <IconLocation />
                    <span>ولاية {order.customer.wilaya}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="order-modal__section">
              <h4 className="order-modal__section-title">معلومات التوصيل</h4>
              <div className="order-delivery-card">
                <div className="order-delivery-card__row">
                  <IconTruck />
                  <span className="order-delivery-card__type">
                    {DELIVERY_TYPES[order.delivery]?.label}
                  </span>
                </div>
                <div className="order-delivery-card__price">
                  رسوم التوصيل: <strong>{formatPrice(deliveryPrice)}</strong>
                </div>
                <div className="order-delivery-card__date">
                  <span>📅 تاريخ الطلب:</span>
                  <strong>{order.createdAt}</strong>
                </div>
                {order.note && (
                  <div className="order-delivery-card__note">
                    <IconNote />
                    <span>{order.note}</span>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Products */}
          <div className="order-modal__section">
            <h4 className="order-modal__section-title">المنتجات المطلوبة</h4>
            <div className="order-products-list">
              {order.products.map((p, i) => (
                <div key={i} className="order-product-row">
                  <div className="order-product-row__info">
                    <span className="order-product-row__name">{p.name}</span>
                    <span className="order-product-row__qty">× {p.qty}</span>
                  </div>
                  <span className="order-product-row__price">{formatPrice(p.price * p.qty)}</span>
                </div>
              ))}
              <div className="order-products-list__separator" />
              <div className="order-product-row order-product-row--sub">
                <span>المجموع الجزئي</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="order-product-row order-product-row--sub">
                <span>رسوم التوصيل</span>
                <span>{formatPrice(deliveryPrice)}</span>
              </div>
              <div className="order-product-row order-product-row--total">
                <span>المبلغ الإجمالي</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* Change Status */}
          {!isCancelled && (
            <div className="order-modal__section">
              <h4 className="order-modal__section-title">تغيير حالة الطلب</h4>
              <div className="order-status-btns">
                {ALL_STATUSES.map(s => (
                  <button
                    key={s}
                    className={`status-change-btn ${order.status === s ? 'status-change-btn--active' : ''} status-change-btn--${STATUS_META[s]?.cls}`}
                    onClick={() => onStatusChange(order.id, s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
function OrdersManagementPage() {
  const [orders, setOrders]           = useState(initialOrders)
  const [search, setSearch]           = useState('')
  const [filterStatus, setFilterStatus] = useState('الكل')
  const [filterWilaya, setFilterWilaya] = useState('الكل')
  const [selectedOrder, setSelectedOrder] = useState(null)

  /* ── Derived stats ── */
  const stats = {
    total:     orders.length,
    pending:   orders.filter(o => o.status === 'قيد التأكيد').length,
    shipping:  orders.filter(o => o.status === 'في التوصيل').length,
    delivered: orders.filter(o => o.status === 'تم التسليم').length,
    cancelled: orders.filter(o => o.status === 'ملغي').length,
    revenue:   orders
      .filter(o => o.status === 'تم التسليم')
      .reduce((s, o) => s + calcTotal(o.products, o.delivery), 0),
  }

  /* ── Filtering ── */
  const filtered = orders.filter(o => {
    const q = search.toLowerCase()
    const matchSearch =
      o.id.toLowerCase().includes(q) ||
      o.customer.name.includes(search) ||
      o.customer.phone.includes(search)
    const matchStatus = filterStatus === 'الكل' || o.status === filterStatus
    const matchWilaya = filterWilaya === 'الكل' || o.customer.wilaya === filterWilaya
    return matchSearch && matchStatus && matchWilaya
  })

  /* ── Handlers ── */
  function handleStatusChange(orderId, newStatus) {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }))
    }
  }

  return (
    <div className="orders-page">

      {/* ── Header ── */}
      <div className="orders-page__header">
        <div>
          <h1 className="orders-page__title">إدارة الطلبات</h1>
          <p className="orders-page__subtitle">متابعة وتسيير جميع طلبات المتجر</p>
        </div>
      </div>

      {/* ── Summary Cards ── */}
      <div className="orders-summary">
        <div className="o-card">
          <span className="o-card__value">{stats.total}</span>
          <span className="o-card__label">إجمالي الطلبات</span>
        </div>
        <div className="o-card o-card--yellow">
          <span className="o-card__value">{stats.pending}</span>
          <span className="o-card__label">قيد التأكيد</span>
        </div>
        <div className="o-card o-card--blue">
          <span className="o-card__value">{stats.shipping}</span>
          <span className="o-card__label">في التوصيل</span>
        </div>
        <div className="o-card o-card--green">
          <span className="o-card__value">{stats.delivered}</span>
          <span className="o-card__label">تم التسليم</span>
        </div>
        <div className="o-card o-card--red">
          <span className="o-card__value">{stats.cancelled}</span>
          <span className="o-card__label">ملغي</span>
        </div>
        <div className="o-card o-card--gold o-card--wide">
          <span className="o-card__value o-card__value--sm">{formatPrice(stats.revenue)}</span>
          <span className="o-card__label">إيرادات مسلّمة</span>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="orders-page__toolbar">
        <div className="search-box">
          <IconSearch />
          <input
            type="text"
            placeholder="بحث بالاسم، الرقم، أو رقم الطلب..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-box__input"
          />
        </div>
        <div className="orders-page__filters">
          <select
            className="orders-select"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="الكل">كل الحالات</option>
            {ALL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            className="orders-select"
            value={filterWilaya}
            onChange={e => setFilterWilaya(e.target.value)}
          >
            <option value="الكل">كل الولايات</option>
            {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="orders-table-wrap">
        <table className="orders-table">
          <thead>
            <tr>
              <th>رقم الطلب</th>
              <th>الزبون</th>
              <th>الهاتف</th>
              <th>الولاية</th>
              <th>التوصيل</th>
              <th>المبلغ الكلي</th>
              <th>الحالة</th>
              <th>التاريخ</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="9" className="orders-table__empty">
                  لا توجد طلبات مطابقة للبحث
                </td>
              </tr>
            ) : filtered.map(order => (
              <tr key={order.id} className={order.status === 'ملغي' ? 'orders-table__row--cancelled' : ''}>

                {/* ID */}
                <td>
                  <span className="orders-table__id">{order.id}</span>
                </td>

                {/* Customer */}
                <td>
                  <div className="orders-table__customer">
                    <div className="orders-table__avatar">
                      {order.customer.name.charAt(0)}
                    </div>
                    <span className="orders-table__name">{order.customer.name}</span>
                  </div>
                </td>

                {/* Phone */}
                <td>
                  <a href={`tel:${order.customer.phone}`} className="orders-table__phone">
                    {order.customer.phone}
                  </a>
                </td>

                {/* Wilaya */}
                <td>
                  <div className="orders-table__wilaya">
                    <IconLocation />
                    {order.customer.wilaya}
                  </div>
                </td>

                {/* Delivery */}
                <td>
                  <div className="orders-table__delivery">
                    <span className="orders-table__delivery-type">
                      {DELIVERY_TYPES[order.delivery]?.label}
                    </span>
                    <span className="orders-table__delivery-price">
                      {formatPrice(DELIVERY_TYPES[order.delivery]?.price)}
                    </span>
                  </div>
                </td>

                {/* Total */}
                <td>
                  <span className="orders-table__total">
                    {formatPrice(calcTotal(order.products, order.delivery))}
                  </span>
                </td>

                {/* Status */}
                <td>
                  <span className={`o-badge ${STATUS_META[order.status]?.cls}`}>
                    {order.status}
                  </span>
                </td>

                {/* Date */}
                <td>
                  <span className="orders-table__date">{order.createdAt}</span>
                </td>

                {/* Actions */}
                <td>
                  <div className="orders-table__actions">
                    <button
                      className="action-btn action-btn--view"
                      onClick={() => setSelectedOrder(order)}
                      title="عرض التفاصيل"
                    >
                      <IconEye /> عرض
                    </button>
                    <select
                      className="action-select"
                      value={order.status}
                      onChange={e => handleStatusChange(order.id, e.target.value)}
                      title="تغيير الحالة"
                    >
                      {ALL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Footer count ── */}
      <p className="orders-page__count">
        عرض {filtered.length} من أصل {orders.length} طلب
      </p>

      {/* ── Order Detail Modal ── */}
      {selectedOrder && (
        <OrderDetailModal
          order={orders.find(o => o.id === selectedOrder.id)}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
        />
      )}

    </div>
  )
}

export default OrdersManagementPage