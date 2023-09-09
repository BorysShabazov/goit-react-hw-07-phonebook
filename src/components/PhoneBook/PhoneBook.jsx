import styles from './phoneBook.module.css';
import { useDispatch } from 'react-redux';
import { addContact } from 'components/redux/contactsSlice';

export const PhoneBook = () => {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();

    const inputName = event.currentTarget.name.value.trim();
    const inputNumber = event.currentTarget.number.value.trim();

    dispatch(addContact(inputName, inputNumber));

    event.currentTarget.number.value = '';
    event.currentTarget.name.value = '';
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button type="submit">Add contact</button>
    </form>
  );
};
