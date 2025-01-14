import arrowleft from 'assets/icons/arrowleft.svg';
import arrowright from 'assets/icons/arrowright.svg';
import LikeIcon from 'assets/icons/Heart';
import { BaseButton } from 'components';
import { ImageSlider } from 'components/slider';
import Share from 'components/ui/Share';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { fetchPetsData, setCurrentPage } from 'store/petsStore/actions';
import { selectPetsCurrentPage, selectPets, selectPetsTotalPages } from 'store/petsStore/selectors';
import { ActionsType, IPetStore } from 'store/petsStore/types';
import { IPet } from 'types/IPet';

import s from './styles.module.scss';

export const Card = () => {
  const dispatch = useDispatch<ThunkDispatch<IPetStore, {}, ActionsType>>();
  const dispatchPage = useDispatch();
  const pets = useSelector(selectPets);
  const currentPage = useSelector(selectPetsCurrentPage);
  const totalPage = useSelector(selectPetsTotalPages);

  useEffect(() => {
    dispatch(fetchPetsData('', currentPage));
  }, [currentPage]);

  const handleNextPage = () => {
    currentPage !== totalPage - 1 && dispatchPage(setCurrentPage(currentPage + 1));
  };

  const handlePreviousPage = () => {
    currentPage !== 0 && dispatchPage(setCurrentPage(currentPage - 1));
  };

  const handleFirstPage = () => {
    dispatchPage(setCurrentPage(0));
  };

  const handleSecondPage = () => {
    dispatchPage(setCurrentPage(1));
  };

  const handleLastPage = () => {
    dispatchPage(setCurrentPage(totalPage - 1));
  };

  const displayData =
    pets &&
    pets.map((pet: IPet) => {
      return (
        <Link key={pet.id} to={`${pet.id}`} state={pet}>
          <div className={s.card}>
            <ImageSlider slides={pet.photos.slice(0, 3)} />
            <div className={s.card__info}>
              <h1 className={s.card__title}>
                {pet.name}, {pet.age}
              </h1>
              <p className={s.card__descr}>{pet.history}</p>
              <LikeIcon className={s.card__like} active={false} />
            </div>
            <Share link={`${window.location.href}/${pet.id}`} btn="icon" />
          </div>
        </Link>
      );
    });

  return (
    <div>
      <div className={s.card__content}>{displayData}</div>
      <div className={s.paginate}>
        <div className={s.paginate__button}>
          <BaseButton
            startIcon={arrowleft}
            click={handlePreviousPage}
            disabled={currentPage === 0 && true}
            variant="outlined"
            color="secondary"
          >
            Предыдущая страница
          </BaseButton>
          <BaseButton
            endIcon={arrowright}
            click={handleNextPage}
            disabled={currentPage + 1 === totalPage && true}
            variant="filled"
            color="primary"
          >
            Следующая страница
          </BaseButton>
        </div>
        <div className={s.paginate__numbers}>
          {currentPage !== 0 && (
            <div onClick={handleFirstPage} className={s.pageDiv}>
              1
            </div>
          )}
          {currentPage === 1 && <div className={`${s.navigationActive} ${s.pageDiv}`}>2</div>}
          {currentPage > 1 && (
            <div onClick={handleSecondPage} className={s.pageDiv}>
              2
            </div>
          )}
          {currentPage < totalPage - 1 && currentPage !== 1 && (
            <div className={`${s.navigationActive} ${s.pageDiv}`}>{currentPage + 1}</div>
          )}
          {currentPage > -1 && currentPage === 0 && totalPage !== 2 && (
            <div onClick={handleSecondPage} className={s.pageDiv}>
              2
            </div>
          )}
          {totalPage > 4 && <div className={s.points}>...</div>}
          {currentPage + 1 !== totalPage && (
            <div onClick={handleLastPage} className={s.pageDiv}>
              {totalPage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
