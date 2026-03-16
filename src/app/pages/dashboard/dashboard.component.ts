import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from 'src/app/components/sidebar/sidebar.component';
import { Topbar } from 'src/app/components/topbar/topbar.component';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [ FormsModule, Sidebar, Topbar, CommonModule ]
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  @ViewChild('pieChartCanvas') pieChartCanvas!: ElementRef;

  username = '';
  password = '';
  error = '';

  constructor(private router: Router) {}

  ngAfterViewInit() {
    // Line Chart
    new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: this.lineChartData,
      options: this.lineChartOptions
    });

    // Pie Chart
    new Chart(this.pieChartCanvas.nativeElement, {
      type: 'pie',
      data: this.pieChartData,
      options: this.pieChartOptions
    });
  }

  getLastSixMonths(): string[] {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const labels: string[] = [];
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      labels.push(months[date.getMonth()]);
    }
    
    return labels;
  }

  // Sales Trend Chart
  public get lineChartData() {
    return {
      labels: this.getLastSixMonths(),
      datasets: [
        {
          data: [12000, 15000, 18000, 14000, 22000, 25000], // Adjusted to 6 data points
          label: 'Sales ($)',
          fill: true,
          tension: 0.5,
        }
      ]
    };
  }

  public lineChartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      title: {
        display: true,
        text: 'Sales Trend (Last 6 Months)'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => '$' + value.toLocaleString()
        }
      }
    }
  };

  // Pie Chart Data
  public pieChartData = {
    labels: ['Electronics', 'Clothing', 'Accessories', 'Other'],
    datasets: [
      {
        data: [45, 25, 20, 10], // Sample percentages
      }
    ]
  };

  public pieChartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right'
      }
    }
  };

  // Latest Orders Data
  public latestOrders = [
    { id: '#12345', customer: 'John Doe', date: '2024-03-12', amount: 299.99, status: 'Completed' },
    { id: '#12346', customer: 'Jane Smith', date: '2024-03-11', amount: 149.50, status: 'Processing' },
    { id: '#12347', customer: 'Bob Johnson', date: '2024-03-10', amount: 89.99, status: 'Shipped' },
    { id: '#12348', customer: 'Alice Brown', date: '2024-03-09', amount: 199.99, status: 'Completed' },
    { id: '#12349', customer: 'Charlie Wilson', date: '2024-03-08', amount: 79.99, status: 'Pending' }
  ];
}