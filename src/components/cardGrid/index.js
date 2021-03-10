import React from 'react';
import Card from './Card';
import propTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import styles from './CardGrid.module.scss';
function CardGrid({ items }) {
  return (
    <section className={styles.cardgrid}>
      {items?.length > 0 ? (
        items.map(card => {
          return (
            <Card
              style={styles.cardgrid__card}
              key={uuidv4()}
              id={card.id}
              title={card.name}
              description={card.description}
              img={card.itemImage}
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
  items: propTypes.array.isRequired,
};
export default React.memo(CardGrid);
