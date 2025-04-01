'use client';

import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';

const ModalDetector = () => {
    const { connectModalOpen } = useConnectModal();

    useEffect(() => {
        if (connectModalOpen) {
            // Create a full-screen black overlay
            const overlay = document.createElement('div');
            overlay.id = 'modal-overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            overlay.style.zIndex = '999'; // High z-index but below modal

            // Insert the overlay before the modal
            document.body.appendChild(overlay);


        } else {
            // Remove the overlay when modal closes
            const overlay = document.getElementById('modal-overlay');
            if (overlay) {
                document.body.removeChild(overlay);

            }
        }
    }, [connectModalOpen]);

    return null; // This component doesn't render anything
};

export default ModalDetector;