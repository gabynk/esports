import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Modal, ModalProps, Text, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { CheckCircle } from 'phosphor-react-native';
import * as Clipboard from 'expo-clipboard';

import { Heading } from "../Heading";

import { THEME } from "../../theme";

import { styles } from './styles';

interface DuoMatchProps extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: DuoMatchProps) {
  const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsCopping(true);

    await Clipboard.setStringAsync(discord);
    Alert.alert('Discord Copiado!',
      'Usuário copiado para você colar no Discord.');

    setIsCopping(false);
  }

  return (
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent
      {...rest}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          />

          <Heading
            title="Let´s play"
            subtitle="Agora é só começar a jogar!"
            style={styles.title}
          />

          <Text style={styles.label}>Adicione no Discord</Text>

          <TouchableOpacity
            onPress={handleCopyDiscordToClipboard}
            style={styles.discordButton}
            disabled={isCopping}
          >
            <Text style={styles.discord}>
              {isCopping
                ? <ActivityIndicator color={THEME.COLORS.PRIMARY} />
                : discord
              }
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}