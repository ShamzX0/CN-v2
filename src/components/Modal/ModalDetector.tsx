'use client';

import { useConnectModal, useAccountModal, useChainModal } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';

const ModalDetector = () => {

    const { connectModalOpen } = useConnectModal();
    const { accountModalOpen } = useAccountModal();
    const { chainModalOpen } = useChainModal();

    const isAnyModalOpen = connectModalOpen || accountModalOpen || chainModalOpen;

    useEffect(() => {
        if (isAnyModalOpen) {
            // Create a full-screen black overlay
            const overlay = document.createElement('div');
            overlay.id = 'modal-overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            overlay.style.zIndex = '999'; //

            document.body.appendChild(overlay);

            console.log('Modal is open, overlay added');
        } else {
            const overlay = document.getElementById('modal-overlay');
            if (overlay) {
                document.body.removeChild(overlay);
                console.log('All modals closed, overlay removed');
            }
        }
    }, [isAnyModalOpen]);

    return null;
};

export default ModalDetector;