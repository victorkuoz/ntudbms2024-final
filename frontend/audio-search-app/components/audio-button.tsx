"use client";
import React from "react";
import { useState } from "react";
import { audioFetch } from "@/lib/route";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Image,
	useDisclosure,
} from "@nextui-org/react";

interface AudioButtonProps {
	filename: string;
}

export default function AudioButton({ filename }: AudioButtonProps) {
	const [audioSrc, setAudioSrc] = useState<string | undefined>("");
	const [downloaded, setDownloaded] = useState<boolean>(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const handleFetchAudio = async () => {
		if (!downloaded) {
			let audio = await audioFetch(filename);
			setAudioSrc(audio);
			setDownloaded(true);
			console.log("download audio file");
		}
		onOpen();
	};

	return (
		<Button
			isIconOnly
			color={downloaded ? "secondary" : "default"}
			aria-label="Play"
			onClick={handleFetchAudio}>
			<Image
				src="/play-icon.png"
				alt="Play Icon"
				width={20}
				height={20}
			/>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				isDismissable={false}
				isKeyboardDismissDisabled={true}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								{filename}
							</ModalHeader>
							<ModalBody>
								<audio controls src={audioSrc}></audio>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									onPress={onClose}>
									Close
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</Button>
	);
}
