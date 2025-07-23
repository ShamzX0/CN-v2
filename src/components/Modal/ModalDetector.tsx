'use client';

import { useConnectModal, useAccountModal, useChainModal } from '@rainbow-me/rainbowkit';
import { useEffect, useCallback } from 'react';

const OVERLAY_ID = 'modal-overlay';

const ModalDetector = () => {
    const { connectModalOpen } = useConnectModal();
    const { accountModalOpen } = useAccountModal();
    const { chainModalOpen } = useChainModal();

    const isAnyModalOpen = connectModalOpen || accountModalOpen || chainModalOpen;

    const createOverlay = useCallback(() => {
        const overlay = document.createElement('div');
        overlay.id = OVERLAY_ID;
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 999;
        `;
        return overlay;
    }, []);

    const removeOverlay = useCallback(() => {
        const overlay = document.getElementById(OVERLAY_ID);
        if (overlay) {
            document.body.removeChild(overlay);
        }
    }, []);

    useEffect(() => {
        if (isAnyModalOpen) {
            const overlay = createOverlay();
            document.body.appendChild(overlay);
            console.log('Modal is open, overlay added');
        } else {
            removeOverlay();
            console.log('All modals closed, overlay removed');
        }

        // Cleanup function to remove overlay when component unmounts
        return () => {
            removeOverlay();
        };
    }, [isAnyModalOpen, createOverlay, removeOverlay]);

    return null;
};

export default ModalDetector;