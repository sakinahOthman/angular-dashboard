import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from 'src/app/components/sidebar/sidebar.component';
import { Topbar } from 'src/app/components/topbar/topbar.component';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [FormsModule, Sidebar, Topbar]
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
          borderColor: '#5E6C5B',
          backgroundColor: 'rgba(94, 108, 91, 0.1)',
          pointBackgroundColor: '#5E6C5B',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#5E6C5B'
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
        backgroundColor: [
          '#5E6C5B',
          '#8B9D83',
          '#B5C4A7',
          '#D4E2D4'
        ],
        hoverBackgroundColor: [
          '#4a5548',
          '#7a8a75',
          '#a3b091',
          '#c2d0c2'
        ]
      }
    ]
  };

  public pieChartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Revenue Distribution'
      }
    }
  };
}