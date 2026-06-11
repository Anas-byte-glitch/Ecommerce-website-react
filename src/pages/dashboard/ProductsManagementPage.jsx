import { useState } from 'react'
import { formatPrice } from '../../utils/formatPrice'
import ProductFormModal from '../../components/Dashboard/ProductFormModal'
import '../../styles/Dashboard/ProductsManagementPage.css'

/* ── Mock Data ── */
const initialProducts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=80&h=80&fit=crop',
    name: 'كريم مرطب فاخر',
    category: 'العناية بالبشرة',
    price: 2500,
    stock: 48,
    status: 'متوفر',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=80&h=80&fit=crop',
    name: 'زيت الأرغان الطبيعي',
    category: 'العناية بالشعر',
    price: 4800,
    stock: 23,
    status: 'متوفر',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&h=80&fit=crop',
    name: 'سيروم فيتامين C',
    category: 'العناية بالبشرة',
    price: 7200,
    stock: 5,
    status: 'متوفر',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=80&h=80&fit=crop',
    name: 'قناع الطين الأبيض',
    category: 'تنظيف البشرة',
    price: 1800,
    stock: 0,
    status: 'غير متوفر',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=80&h=80&fit=crop',
    name: 'كريم واقي الشمس SPF50',
    category: 'الحماية',
    price: 3200,
    stock: 17,
    status: 'متوفر',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1631730486784-74757073d9d3?w=80&h=80&fit=crop',
    name: 'مزيل مكياج لطيف',
    category: 'تنظيف البشرة',
    price: 2100,
    stock: 0,
    status: 'غير متوفر',
  },
]

/* ── Icons ── */
const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)
const IconEdit = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)
const IconTrash = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
)
const IconSearch = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)
const IconPackage = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
)

/* ── Confirm Delete Modal ── */
function ConfirmModal({ product, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="confirm-modal" onClick={e => e.stopPropagation()}>
        <div className="confirm-modal__icon">
          <IconTrash />
        </div>
        <h3 className="confirm-modal__title">حذف المنتج</h3>
        <p className="confirm-modal__text">
          هل أنت متأكد من حذف <strong>"{product.name}"</strong>؟
          <br />لا يمكن التراجع عن هذا الإجراء.
        </p>
        <div className="confirm-modal__actions">
          <button className="btn btn--ghost" onClick={onCancel}>إلغاء</button>
          <button className="btn btn--danger" onClick={onConfirm}>حذف</button>
        </div>
      </div>
    </div>
  )
}

/* ── Main Page ── */
function ProductsManagementPage() {
  const [products, setProducts]           = useState(initialProducts)
  const [search, setSearch]               = useState('')
  const [filterStatus, setFilterStatus]   = useState('الكل')
  const [showForm, setShowForm]           = useState(false)
  const [editProduct, setEditProduct]     = useState(null)
  const [deleteTarget, setDeleteTarget]   = useState(null)

  /* ── Derived ── */
  const filtered = products.filter(p => {
    const matchSearch = p.name.includes(search) || p.category.includes(search)
    const matchStatus = filterStatus === 'الكل' || p.status === filterStatus
    return matchSearch && matchStatus
  })

  const totalProducts   = products.length
  const totalAvailable  = products.filter(p => p.status === 'متوفر').length
  const totalOutOfStock = products.filter(p => p.status === 'غير متوفر').length

  /* ── Handlers ── */
  function handleAdd(data) {
    setProducts(prev => [
      ...prev,
      { ...data, id: Date.now(), status: data.stock > 0 ? 'متوفر' : 'غير متوفر' },
    ])
    setShowForm(false)
  }

  function handleEdit(data) {
    setProducts(prev =>
      prev.map(p =>
        p.id === data.id
          ? { ...data, status: data.stock > 0 ? 'متوفر' : 'غير متوفر' }
          : p
      )
    )
    setEditProduct(null)
    setShowForm(false)
  }

  function handleDelete() {
    setProducts(prev => prev.filter(p => p.id !== deleteTarget.id))
    setDeleteTarget(null)
  }

  function openEdit(product) {
    setEditProduct(product)
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditProduct(null)
  }

  return (
    <div className="products-page">

      {/* ── Page Header ── */}
      <div className="products-page__header">
        <div>
          <h1 className="products-page__title">إدارة المنتجات</h1>
          <p className="products-page__subtitle">إجمالي {totalProducts} منتج في المتجر</p>
        </div>
        <button className="btn btn--primary" onClick={() => { setEditProduct(null); setShowForm(true) }}>
          <IconPlus />
          إضافة منتج
        </button>
      </div>

      {/* ── Summary Cards ── */}
      <div className="products-page__summary">
        <div className="summary-card">
          <span className="summary-card__value">{totalProducts}</span>
          <span className="summary-card__label">إجمالي المنتجات</span>
        </div>
        <div className="summary-card summary-card--green">
          <span className="summary-card__value">{totalAvailable}</span>
          <span className="summary-card__label">متوفر</span>
        </div>
        <div className="summary-card summary-card--red">
          <span className="summary-card__value">{totalOutOfStock}</span>
          <span className="summary-card__label">غير متوفر</span>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="products-page__toolbar">
        <div className="search-box">
          <IconSearch />
          <input
            type="text"
            placeholder="بحث عن منتج..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-box__input"
          />
        </div>
        <div className="filter-tabs">
          {['الكل', 'متوفر', 'غير متوفر'].map(f => (
            <button
              key={f}
              className={`filter-tab ${filterStatus === f ? 'filter-tab--active' : ''}`}
              onClick={() => setFilterStatus(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="products-table-wrap">
        {filtered.length === 0 ? (
          <div className="products-empty">
            <div className="products-empty__icon"><IconPackage /></div>
            <p className="products-empty__text">لا توجد منتجات مطابقة</p>
          </div>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>المنتج</th>
                <th>الفئة</th>
                <th>السعر</th>
                <th>المخزون</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id}>

                  {/* Product */}
                  <td>
                    <div className="product-cell">
                      <div className="product-cell__img-wrap">
                        {product.image
                          ? <img src={product.image} alt={product.name} className="product-cell__img" />
                          : <div className="product-cell__img-placeholder"><IconPackage /></div>
                        }
                      </div>
                      <span className="product-cell__name">{product.name}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td><span className="product-category">{product.category}</span></td>

                  {/* Price */}
                  <td><span className="product-price">{formatPrice(product.price)}</span></td>

                  {/* Stock */}
                  <td>
                    <span className={`product-stock ${product.stock === 0 ? 'product-stock--zero' : product.stock <= 10 ? 'product-stock--low' : ''}`}>
                      {product.stock}
                    </span>
                  </td>

                  {/* Status */}
                  <td>
                    <span className={`status-badge ${product.status === 'متوفر' ? 'status-badge--in' : 'status-badge--out'}`}>
                      {product.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="product-actions">
                      <button
                        className="action-btn action-btn--edit"
                        onClick={() => openEdit(product)}
                        title="تعديل"
                      >
                        <IconEdit /> تعديل
                      </button>
                      <button
                        className="action-btn action-btn--delete"
                        onClick={() => setDeleteTarget(product)}
                        title="حذف"
                      >
                        <IconTrash /> حذف
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Modals ── */}
      {showForm && (
        <ProductFormModal
          product={editProduct}
          onSave={editProduct ? handleEdit : handleAdd}
          onClose={closeForm}
        />
      )}

      {deleteTarget && (
        <ConfirmModal
          product={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

    </div>
  )
}

export default ProductsManagementPage