'use client';

import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from '@/lib/fb_config';
import generateAndUploadWorkPost from "@/lib/generateAIPosts";


