import StatsCard        from '../../components/dashboard/StatsCard'
import SalesChart       from '../../components/dashboard/SalesChart'
import TopProductsTable from '../../components/dashboard/TopProductsTable'
import { formatPrice }  from '../../utils/formatPrice'
import '../../styles/dashboard/DashboardOverviewPage.css'

/* ── Icons ── */
const IconRevenue = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
)
const IconOrders = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
)
const IconCustomers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const IconProducts = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
)

/* ── Stats ── */
const statsData = [
  {
    icon: <IconRevenue />,
    label: 'المبيعات اليوم',
    value: formatPrice(125000),
    subtitle: 'اليوم',
    trend: 12,
    trendLabel: 'مقارنةً بالأمس',
  },
  {
    icon: <IconOrders />,
    label: 'عدد الطلبات',
    value: '42',
    subtitle: 'هذا الأسبوع',
    trend: 8,
    trendLabel: 'مقارنةً بالأسبوع الماضي',
  },
  {
    icon: <IconCustomers />,
    label: 'عدد الزبائن',
    value: '120',
    subtitle: 'إجمالي',
    trend: 5,
    trendLabel: 'زبون جديد هذا الشهر',
  },
  {
    icon: <IconProducts />,
    label: 'المنتجات المباعة',
    value: '87',
    subtitle: 'هذا الشهر',
    trend: -3,
    trendLabel: 'مقارنةً بالشهر الماضي',
  },
]

/* ── Recent Orders ── */
const recentOrders = [
  { id: '#BLZ-001', customer: 'فاطمة بن علي',      wilaya: 'الجزائر العاصمة', status: 'تم التسليم',  payment: 'الدفع عند الاستلام', total: formatPrice(8500)  },
  { id: '#BLZ-002', customer: 'أمينة كريم',         wilaya: 'وهران',           status: 'في التوصيل',  payment: 'الدفع عند الاستلام', total: formatPrice(12200) },
  { id: '#BLZ-003', customer: 'سارة مزيان',         wilaya: 'قسنطينة',        status: 'قيد التأكيد', payment: 'الدفع عند الاستلام', total: formatPrice(5800)  },
  { id: '#BLZ-004', customer: 'نور الهدى بلقاسم',   wilaya: 'بشار',           status: 'ملغي',        payment: 'الدفع عند الاستلام', total: formatPrice(3200)  },
  { id: '#BLZ-005', customer: 'ياسمين عيسى',        wilaya: 'عنابة',          status: 'تم التسليم',  payment: 'الدفع عند الاستلام', total: formatPrice(9750)  },
]

const statusClass = {
  'تم التسليم':  'badge--delivered',
  'في التوصيل':  'badge--shipping',
  'قيد التأكيد': 'badge--pending',
  'ملغي':        'badge--cancelled',
}

/* ── Page ── */
function DashboardOverviewPage() {
  return (
    <div className="overview">

      {/* Header */}
      <div className="overview__header">
        <div>
          <h1 className="overview__title">مرحباً بك في لوحة التحكم</h1>
          <p className="overview__subtitle">إليك ملخص نشاط متجر Bellezza اليوم</p>
        </div>
        <div className="overview__date">
          {new Date().toLocaleDateString('ar-DZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="overview__stats">
        {statsData.map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>

      {/* Chart */}
      <SalesChart />

      {/* Bottom Row */}
      <div className="overview__bottom">

        {/* Recent Orders */}
        <div className="overview__orders">
          <div className="overview__section-header">
            <div>
              <h2 className="overview__section-title">آخر الطلبات</h2>
              <p className="overview__section-sub">أحدث 5 طلبات واردة</p>
            </div>
            <button className="overview__view-all">عرض الكل</button>
          </div>

          <div className="overview__table-wrap">
            <table className="overview__table">
              <thead>
                <tr>
                  <th>رقم الطلب</th>
                  <th>الزبون</th>
                  <th>الولاية</th>
                  <th>الحالة</th>
                  <th>المبلغ</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="overview__order-id">{order.id}</td>
                    <td className="overview__customer">{order.customer}</td>
                    <td className="overview__wilaya">{order.wilaya}</td>
                    <td>
                      <span className={`badge ${statusClass[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="overview__total">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats sidebar */}
        <div className="overview__quick">
          <h3 className="overview__quick-title">ملخص سريع</h3>

          <div className="overview__quick-item">
            <span className="overview__quick-label">متوسط قيمة الطلب</span>
            <span className="overview__quick-value">{formatPrice(7890)}</span>
          </div>
          <div className="overview__quick-item">
            <span className="overview__quick-label">نسبة التسليم</span>
            <span className="overview__quick-value overview__quick-value--green">92%</span>
          </div>
          <div className="overview__quick-item">
            <span className="overview__quick-label">نسبة الإلغاء</span>
            <span className="overview__quick-value overview__quick-value--red">4%</span>
          </div>
          <div className="overview__quick-item">
            <span className="overview__quick-label">أكثر ولاية طلباً</span>
            <span className="overview__quick-value">الجزائر العاصمة</span>
          </div>
          <div className="overview__quick-item">
            <span className="overview__quick-label">طريقة الدفع</span>
            <span className="overview__quick-value">الدفع عند الاستلام</span>
          </div>

          <div className="overview__payment-bar">
            <div className="overview__payment-bar-fill" style={{ width: '100%' }} />
          </div>
          <p className="overview__payment-note">100% من الطلبات دفع عند الاستلام</p>
        </div>

      </div>

      {/* Top Products */}
      <TopProductsTable />

    </div>
  )
}

export default DashboardOverviewPage