import { useState, useEffect } from 'react'
import '../../styles/Dashboard/ProductFormModal.css'

const CATEGORIES = ['العناية بالبشرة', 'العناية بالشعر', 'تنظيف البشرة', 'الحماية', 'المكياج', 'العطور']

const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const IconImage = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21,15 16,10 5,21"/>
  </svg>
)

function ProductFormModal({ product, onSave, onClose }) {
  const isEdit = !!product

  const [form, setForm] = useState({
    name:     '',
    category: CATEGORIES[0],
    price:    '',
    stock:    '',
    image:    '',
  })

  useEffect(() => {
    if (product) {
      setForm({
        name:     product.name,
        category: product.category,
        price:    product.price,
        stock:    product.stock,
        image:    product.image || '',
      })
    }
  }, [product])

  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!form.name.trim())          e.name  = 'اسم المنتج مطلوب'
    if (!form.price || form.price <= 0) e.price = 'السعر يجب أن يكون أكبر من 0'
    if (form.stock === '' || form.stock < 0) e.stock = 'المخزون يجب أن يكون 0 أو أكثر'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    onSave({
      ...(product || {}),
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="product-modal__header">
          <h2 className="product-modal__title">
            {isEdit ? 'تعديل المنتج' : 'إضافة منتج جديد'}
          </h2>
          <button className="product-modal__close" onClick={onClose}>
            <IconClose />
          </button>
        </div>

        {/* Body */}
        <div className="product-modal__body">

          {/* Image Preview */}
          <div className="product-modal__image-section">
            <div className="product-modal__image-preview">
              {form.image
                ? <img src={form.image} alt="preview" />
                : <div className="product-modal__image-placeholder"><IconImage /></div>
              }
            </div>
            <div className="product-modal__image-input-wrap">
              <label className="product-modal__label">رابط الصورة</label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
                className="product-modal__input"
              />
              <span className="product-modal__hint">أدخل رابط URL لصورة المنتج</span>
            </div>
          </div>

          {/* Name */}
          <div className="product-modal__field">
            <label className="product-modal__label">
              اسم المنتج <span className="product-modal__required">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="مثال: كريم مرطب فاخر"
              className={`product-modal__input ${errors.name ? 'product-modal__input--error' : ''}`}
            />
            {errors.name && <span className="product-modal__error">{errors.name}</span>}
          </div>

          {/* Category */}
          <div className="product-modal__field">
            <label className="product-modal__label">الفئة</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="product-modal__select"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Price + Stock row */}
          <div className="product-modal__row">
            <div className="product-modal__field">
              <label className="product-modal__label">
                السعر (دج) <span className="product-modal__required">*</span>
              </label>
              <div className="product-modal__input-group">
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="2500"
                  min="0"
                  className={`product-modal__input ${errors.price ? 'product-modal__input--error' : ''}`}
                />
                <span className="product-modal__input-suffix">دج</span>
              </div>
              {errors.price && <span className="product-modal__error">{errors.price}</span>}
            </div>

            <div className="product-modal__field">
              <label className="product-modal__label">
                المخزون <span className="product-modal__required">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className={`product-modal__input ${errors.stock ? 'product-modal__input--error' : ''}`}
              />
              {errors.stock && <span className="product-modal__error">{errors.stock}</span>}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="product-modal__footer">
          <button className="btn btn--ghost" onClick={onClose}>إلغاء</button>
          <button className="btn btn--primary" onClick={handleSubmit}>
            {isEdit ? 'حفظ التعديلات' : 'إضافة المنتج'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default ProductFormModal