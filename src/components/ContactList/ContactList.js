import React from 'react';
import propTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import * as SC from './ContactList.styled';
import { FcPhoneAndroid } from 'react-icons/fc';
import { removeContact } from '../../redux/contactSlice';
import {
  getError,
  getIsLoading,
  selectFilteredContacts,
} from '../../redux/selectors';

export const ContactList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <>
      {isLoading && <p>Loading tasks...</p>}
      {error && <p>{error}</p>}
      <SC.ContactListUl>
        {filteredContacts.map(({ name, phone, id }) => (
          <SC.ContactListLi key={id}>
            <SC.ContactCard>
              <FcPhoneAndroid />
              <SC.ContactTitle>
                {name}: {phone}
              </SC.ContactTitle>
            </SC.ContactCard>

            <SC.ButtonDelete
              type="button"
              onClick={() => dispatch(removeContact({ id }))}
            >
              Delete
            </SC.ButtonDelete>
          </SC.ContactListLi>
        ))}
      </SC.ContactListUl>
    </>
  );
};

ContactList.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.exact({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      number: propTypes.string.isRequired,
    })
  ),
};
