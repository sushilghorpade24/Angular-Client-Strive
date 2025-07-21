import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [NgFor],
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.css'
})
export class TermsAndConditionsComponent {
  termsSections = [
    {
      title: 'Acceptance of Terms',
      content:
        'By accessing or using our platform, you agree to comply with and be bound by these terms. If you do not agree, please do not use the service.'
    },
    {
      title: 'Use of the Platform',
      content:
        'You agree to use the platform only for lawful purposes. Any unauthorized use, including unauthorized access or misuse of data, is strictly prohibited.'
    },
    {
      title: 'Intellectual Property',
      content:
        'All content, trademarks, and intellectual property on Strive are owned by us or our partners. You may not copy, modify, or distribute any part without permission.'
    },
    {
      title: 'Account Responsibility',
      content:
        'You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.'
    },
    {
      title: 'Termination',
      content:
        'We reserve the right to suspend or terminate your access at any time for violations of these terms or applicable laws.'
    },
    {
      title: 'Limitation of Liability',
      content:
        'We are not liable for any direct or indirect damages arising from the use or inability to use the platform. Use the service at your own risk.'
    },
    {
      title: 'Changes to Terms',
      content:
        'We may update these terms from time to time. Continued use of the platform means you accept the updated terms. Check this page regularly.'
    },
    {
      title: 'Contact Us',
      content:
        'For any questions or concerns, please contact us at: terms@strive.com'
    }
  ];
}
