import { formatPrice } from '../../utils/formatPrice'
import '../../styles/dashboard/TopProductsTable.css'

const products = [
  {
    rank: 1,
    name: 'كريم مرطب فاخر',
    category: 'العناية بالبشرة',
    stock: 'متوفر',
    sold: 312,
    revenue: formatPrice(312 * 1850),
  },
  {
    rank: 2,
    name: 'زيت الأرغان الطبيعي',
    category: 'العناية بالشعر',
    stock: 'متوفر',
    sold: 278,
    revenue: formatPrice(278 * 2200),
  },
  {
    rank: 3,
    name: 'سيروم فيتامين C',
    category: 'العناية بالبشرة',
    stock: 'نفاد قريب',
    sold: 195,
    revenue: formatPrice(195 * 3100),
  },
  {
    rank: 4,
    name: 'قناع الطين الأبيض',
    category: 'تنظيف البشرة',
    stock: 'متوفر',
    sold: 164,
    revenue: formatPrice(164 * 980),
  },
  {
    rank: 5,
    name: 'كريم واقي الشمس SPF50',
    category: 'الحماية',
    stock: 'نفاد',
    sold: 143,
    revenue: formatPrice(143 * 2750),
  },
]

const stockClass = {
  'متوفر':      'stock--in',
  'نفاد قريب':  'stock--low',
  'نفاد':       'stock--out',
}

function TopProductsTable() {
  return (
    <div className="top-products">
      <div className="top-products__header">
        <div>
          <h3 className="top-products__title">أكثر المنتجات مبيعاً</h3>
          <p className="top-products__sub">أداء المنتجات هذا الشهر</p>
        </div>
        <button className="top-products__btn">عرض الكل</button>
      </div>

      <div className="top-products__table-wrap">
        <table className="top-products__table">
          <thead>
            <tr>
              <th>#</th>
              <th>المنتج</th>
              <th>الفئة</th>
              <th>المخزون</th>
              <th>المباع</th>
              <th>الإيراد</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.rank}>
                <td>
                  <span className={`rank ${p.rank <= 3 ? 'rank--top' : ''}`}>
                    {p.rank}
                  </span>
                </td>
                <td className="top-products__name">{p.name}</td>
                <td className="top-products__cat">{p.category}</td>
                <td>
                  <span className={`stock ${stockClass[p.stock]}`}>
                    {p.stock}
                  </span>
                </td>
                <td className="top-products__sold">{p.sold}</td>
                <td className="top-products__revenue">{p.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TopProductsTable