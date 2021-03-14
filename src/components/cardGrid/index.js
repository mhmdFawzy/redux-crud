import Card from './Card';
import React from 'react';
import propTypes from 'prop-types';
import styles from './CardGrid.module.scss';
import { v4 as uuidv4 } from 'uuid';
function CardGrid({ items }) {
  return (
    <section className={styles.cardgrid}>
      {items && Object.keys(items).length !== 0 && items.constructor === Object ? (
        Object.values(items).map(card => {
          return (
            <Card
              style={styles.cardgrid__card}
              key={uuidv4()}
              id={card.id}
              title={card.Name}
              description={card.Description}
              img={card.ItemImgUrl}
            />
          );
        })
      ) : (
        <h3>Please add some items first </h3>
      )}
    </section>
  );
}
CardGrid.propTypes = {
  items: propTypes.object.isRequired,
};
export default React.memo(CardGrid);
