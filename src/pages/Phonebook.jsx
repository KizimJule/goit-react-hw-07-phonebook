import { Section } from '../components/Section/Section';
import { ContactForm } from '../components/ContactForm/ContactForm';
import { ContactList } from '../components/ContactList/ContactList';
import { Filter } from '../components/Filter/Filter';
import { Loader } from '../components/Loader/Loader';
import { useSelector } from 'react-redux';
import { selectIsLoading, selectError } from '../redux/selectors';
import { ContainerMain } from './phonebook.styled';

export function Phonebook() {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return (
    <ContainerMain>
      <Section title="Add contact in your phonebook">
        <ContactForm />
      </Section>
      <Section title="Your contacts">
        <Filter />
        {isLoading && !error && <Loader />}
        <ContactList />
      </Section>
    </ContainerMain>
  );
}
