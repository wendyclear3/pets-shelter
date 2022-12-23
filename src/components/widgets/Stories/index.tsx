import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { stories } from '../../../mocks/stories'
import { ImageSliderTwo } from '../../sliderTwo'
import { Link } from 'react-router-dom'
import { handleShareButton } from '../../sharebtn'
import IncreaseIcon from '../../../assets/icons/Increase'
import EyeIcon from '../../../assets/icons/Eye'
import ShareIcon from '../../../assets/icons/Share'
// import arrow from '../../../assets/icons/needhelp/arrow.svg'

import Sleepingcat from '../../../assets/icons/stories/Sleepingcat.svg'

import s from './styles.module.scss'
import styles from './styles.module.scss'

const Stories = () => {

  const { t } = useTranslation()

  const [ isOpen, setIsOpen ] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  let storiesCards = stories.map(item => {
    return (
      <div key={item.key} className={s.stories__subcontainer}>
          <ImageSliderTwo isOpen={isOpen} togglePopup={togglePopup} slides={item.src}/>
          <div className={s.stories__subcontainer__info}>
            <div className={s.stories__subcontainer__views}>
              <div className={s.stories__subcontainer__views__date}>{item.date}</div>
              <div className={s.stories__subcontainer__views__look}>
                <EyeIcon className={s.stories__subcontainer__views__look__img}/>{item.views}</div>
              <div className={s.stories__subcontainer__views__share} onClick={handleShareButton}>
                {item.share}
                <ShareIcon className={s.stories__subcontainer__views__share__img}/>{styles.share}
              </div>
          </div>
            <div className={s.stories__subcontainer__title}>{item.title}</div>
            <div className={s.stories__subcontainer__content}>{item.content}</div>
          </div>
        </div>
    )
  })

  return (
    <div>
      {isOpen && <div className={s.popupBox}></div>}
      <div>Главная<div className='arrow right'></div>История спасения</div>
      <div className={s.stories}>
        <div className={s.stories__main__container}>
          <div className={s.stories__img__container}><img className={s.stories__img} src={Sleepingcat} alt="Спящий кот"/></div>
          <div className={s.stories__title__container}>
            <p className={s.stories__title}>{t('stories.main_title')}</p>
            <p className={s.stories__content}>{t('stories.main_content')}</p>
          </div>
        </div>
      </div>
    {storiesCards}</div>
  )
}
export default Stories