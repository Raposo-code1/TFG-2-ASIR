import { View } from 'react-native';
import { Input } from "native-base";
import { styles } from './Search.styles';
import { createFilter } from "react-search-input";

const KEYS_TO_FILTERS = ["email", "firstname", "lastname"];

export function Search(props) {
  const { data, setData } = props;

  const onSearch = (text) => {
    const resultSearch = data.filter(createFilter(text, KEYS_TO_FILTERS));
    setData(resultSearch);
  };

  return (
    <View style={styles.content}>
      <Input 
        placeholder="Buscar" 
        variant="unstyled" 
        style={styles.input} 
        onChangeText={onSearch}
        autoCapitalize="none"  // Agregar autoCapitalize con un valor válido
      />
    </View>
  );
}




