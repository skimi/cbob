import React from 'react';
import classnames from 'classnames';
import withStateHandlers from 'recompose/withStateHandlers';

import styles from './styles.scss';

const OrderForm = ({
  base,
  type: selectedType,
  subType: selectedSubType,
  amount,
  price,
  changeType,
  changeSubType,
  changeAmount,
  changePrice,
  isSaving,
  save,
}) => (
  <div className={styles.orderForm}>
    <ul className={styles.subTypes}>
      {['limit', 'market', 'stop'].map(subType => (
        <li key={subType}>
          <button
            onClick={() => changeSubType(subType)}
            className={classnames(styles.subType, {
              [styles.activeSubType]: selectedSubType === subType,
            })}
          >
            {subType}
          </button>
        </li>
      ))}
    </ul>
    <div className={styles.types}>
      {['buy', 'sell'].map(type => (
        <button
          key={type}
          onClick={() => changeType(type)}
          className={classnames(styles.type, {
            [styles.activeType]: type === selectedType,
          })}
        >
          {type}
        </button>
      ))}
    </div>
    <form>
      <div className={styles.inputWrapper}>
        <label htmlFor="amount">Amount</label>
        <div className={styles.input}>
          <input
            type="number"
            id="amount"
            onChange={(e) => changeAmount(e.target.value)}
            value={amount}
          />
          <span>{base}</span>
        </div>
      </div>
        {selectedSubType !== 'market' && (
        <div className={styles.inputWrapper}>
          <label htmlFor="price">Price</label>
          <div className={styles.input}>
            <input
              type="number"
              id="price"
              onChange={(e) => changePrice(e.target.value)}
              value={price}
            />
            <span>EUR</span>
          </div>
        </div>
      )}
      <button
        type="submit"
        className={styles.submit}
        disabled={!amount || !price || isSaving}
        onClick={() => save({
          base,
          type: selectedType,
          subtype: selectedSubType,
          amount,
          price,
        })}
      >
        Place order {!!amount && !!price && (
          <span>{price * amount}€</span>
        )}
      </button>
    </form>
  </div>
);

export default withStateHandlers(
  ({ lastBuyPrice }) => ({
    type: 'buy',
    subType: 'limit',
    amount: 0,
    price: lastBuyPrice,
  }),
  {
    changeType: (state, { lastBuyPrice, lastSellPrice }) => (type) => ({
      type,
      price: type === 'buy' ? lastBuyPrice : lastSellPrice,
    }),
    changeSubType: () => (subType) => ({ subType }),
    changeAmount: () => (amount) => ({ amount }),
    changePrice: () => (price) => ({ price }),
  }
)(OrderForm);
