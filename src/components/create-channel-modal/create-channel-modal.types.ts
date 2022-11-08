import { MouseEvent } from 'react';

export interface CreateChannelModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleBackgroundClick: (e: MouseEvent) => void;
}
