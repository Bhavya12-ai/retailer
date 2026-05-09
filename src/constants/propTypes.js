import PropTypes from "prop-types";

export const transactionShape = PropTypes.shape({
  transactionId: PropTypes.string.isRequired,
  customerId: PropTypes.string.isRequired,
  customerName: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  monthKey: PropTypes.string.isRequired,
  monthLabel: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
});

export const monthShape = PropTypes.shape({
  key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
});

export const customerTotalShape = PropTypes.shape({
  customerId: PropTypes.string.isRequired,
  customerName: PropTypes.string.isRequired,
  totalPoints: PropTypes.number.isRequired,
  totalTransactions: PropTypes.number.isRequired,
});

export const monthlyDataShape = PropTypes.objectOf(
  PropTypes.shape({
    customerName: PropTypes.string.isRequired,
    months: PropTypes.objectOf(
      PropTypes.shape({
        points: PropTypes.number.isRequired,
        transactionCount: PropTypes.number.isRequired,
      })
    ).isRequired,
  })
);
