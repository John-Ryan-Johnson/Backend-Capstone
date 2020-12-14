/* eslint-disable import/no-anonymous-default-export */
import PropTypes from 'prop-types';

const employeeShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  isSupervisor: PropTypes.bool.isRequired,
  isDeleted: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  firebaseUid: PropTypes.string.isRequired,
});

export default { employeeShape };
