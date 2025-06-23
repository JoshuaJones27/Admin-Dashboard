import { Component, Input } from '@angular/core'; // Import Angular core modules
import { SharedService } from '../services/shared.service'; // Import shared service
import { EmpresaService } from '../services/empresa.service'; // Import company service
import { TradutorService } from '../services/tradutor.service'; // Import translation service
import { IdiomaService } from '../services/idioma.service'; // Import language service

@Component({
  selector: 'app-body', // Component selector
  templateUrl: './body.component.html', // Template file
  styleUrls: ['./body.component.scss'], // Stylesheet file
})
export class BodyComponent {
  @Input() collapsed = false; // Input property to indicate if sidebar is collapsed
  @Input() screenWidth = 0; // Input property for screen width

  companyId: string | undefined; // Holds the company ID
  companyName: string | undefined; // Holds the company name

  constructor(
    private sharedService: SharedService, // Inject shared service
    private empresaService: EmpresaService, // Inject company service
    private tradutorService: TradutorService, // Inject translation service
    private idiomaService: IdiomaService // Inject language service
  ) {}

  // Method to translate a given key using the translation service
  translate(key: string): string {
    return this.tradutorService.translate(key);
  }

  // Method to change the language using the translation service
  changeLanguage(language: string): void {
    this.tradutorService.setLanguage(language);
  }

  // Lifecycle hook that runs after component initialization
  ngOnInit(): void {
    this.companyId = this.sharedService.getCompanyId(); // Get company ID from shared service
    console.log('CompanyId:', this.companyId); // Log company ID

    // Fetch company data from the company service
    this.empresaService.getCompanyID().subscribe(
      (response) => {
        console.log('Response Data:', response.data); // Log response data
        this.companyName = response.data.model.name; // Set company name from response
        console.log('CompanyName:', this.companyName); // Log company name
      },
      (error) => {
        console.error('Error:', error); // Log error if request fails
      }
    );
  }

  // Method to determine the CSS class for the body based on sidebar and screen width
  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed'; // Class for collapsed sidebar on large screens
    } else if (
      this.collapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen'; // Class for collapsed sidebar on medium screens
    }
    return styleClass; // Return the computed class
  }
}
