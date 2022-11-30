import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as SC from './ContactForm.styled';
import { selectContacts } from '../../redux/selectors';
import { addContacts } from '../../redux/operations';

export function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // const [contactId, setContactId] = useState(nanoid());

  const contacts = useSelector(selectContacts);
  // const error = useSelector(getError);
  // const isLoading = useSelector(getIsLoading);

  let NameInputId = nanoid();
  let PhoneInputId = nanoid();

  const dispatch = useDispatch();

  const handleInputChange = evt => {
    const { name, value } = evt.target;
    // console.log(name, value);
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setPhone(value);
        break;

      default:
        break;
    }
  };

  const reset = () => {
    setName('');
    setPhone('');
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = { id: nanoid(), name, phone };
    dispatch(addContacts(newContact));
    reset();
  };

  return (
    <SC.Screen>
      <SC.ScreenContent>
        <SC.Form onSubmit={handleSubmit}>
          <SC.Label htmlFor={NameInputId}>
            Name
            <SC.Input
              onChange={handleInputChange}
              value={name}
              type="text"
              name="name"
              placeholder="Name"
              id={NameInputId}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </SC.Label>
          <SC.Label htmlFor={PhoneInputId}>
            Number
            <SC.Input
              value={phone}
              onChange={handleInputChange}
              type="tel"
              name="number"
              placeholder="Number"
              id={PhoneInputId}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </SC.Label>
          <SC.ButtonForm type="submit">Add contact</SC.ButtonForm>
        </SC.Form>
      </SC.ScreenContent>
      <SC.ScreenBackground>
        <SC.ScreenBackgroundShape4></SC.ScreenBackgroundShape4>
        <SC.ScreenBackgroundShape3></SC.ScreenBackgroundShape3>
        <SC.ScreenBackgroundShape2></SC.ScreenBackgroundShape2>
        <SC.ScreenBackgroundShape1></SC.ScreenBackgroundShape1>
      </SC.ScreenBackground>
    </SC.Screen>
  );
}

ContactForm.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleInputChange: PropTypes.func,
};
