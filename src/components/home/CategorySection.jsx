import '../../styles/Store/CategorySection.css'
import arrowRightUpIcon from '../../assets/icons/arrow-right-up-long-line.svg'

const categories = [
  {
    title: 'Skin Care',
    href: '/categories/skin-care',
    image: 'https://framerusercontent.com/images/LaLij8DqDm1vpNmsD2OIOUroZ4.jpg?width=1200&height=1200',
    alt: 'Woman surrounded by flowers enjoying a natural skincare moment',
  },
  {
    title: 'Hair Style',
    href: '/categories/hair-style',
    image: 'https://framerusercontent.com/images/dfMA216I3syTOh4Y7p3UItBvRw.png?width=900&height=1200',
    alt: 'Woman with vibrant red hair styled elegantly',
  },
  {
    title: 'Body Wash',
    href: '/categories/body-wash',
    image: 'https://framerusercontent.com/images/nhqz1YCIa8yPoP4ieRCXJHL7nNU.jpg?width=904&height=1200',
    alt: 'Person washing with foaming shower gel for a fresh cleanse',
  },
  {
    title: 'Makeup',
    href: '/categories/makeup',
    image: 'https://framerusercontent.com/images/78d67EfZcHHwAdH0QbvnCXIcj5Y.png?width=800&height=1200',
    alt: 'Woman applying colorful face mask and makeup patches',
  },
]

function CategorySection() {
  return (
    <section className="category-section" id="categories" aria-labelledby="category-title">
      <div className="category-section__content">
        <h2 className="category-section__eyebrow" id="category-title">
          CATEGORIES
        </h2>

        <div className="category-section__grid">
          {categories.map((category) => (
            <a className="category-card" href={category.href} key={category.title}>
              <span className="category-card__image">
                <img src={category.image} alt={category.alt} />
                <span className="category-card__overlay" />
                <span className="category-card__icon">
                  <img src={arrowRightUpIcon} alt="" aria-hidden="true" />
                </span>
              </span>

              <span className="category-card__title">{category.title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
