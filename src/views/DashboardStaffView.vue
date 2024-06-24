<template>
  <ViewUsedByStaff>
    <template #content>
      <div class="dashboard-staff-container" v-if="isVisible">
        <div class="row">
          <div class="rent-payment-status-statistic-card">
            <Card class="flex-1">
              <template #content>
                <div class="flex justify-content-between gap-5">
                  <div class="flex flex-column gap-1">
                    <span class="text-secondary">{{ $t('dashboard.unpaidRent') }}</span>
                    <br />
                    <span class="font-bold text-lg">${{
                      new Intl.NumberFormat("en-US").format(
                        statistics.rentPaymentStatusStatistic
                          .unpaidStatisticElement.invoiceRevenue
                      )
                    }}</span>
                    <br />
                    <span class="opacity-50"
                      >{{
                        statistics.rentPaymentStatusStatistic
                          .unpaidStatisticElement.numberOfInvoice
                      }}
                      {{ $t('dashboard.unpaid') }}</span
                    >
                  </div>
                  <span
                    class="w-2rem h-2rem border-circle inline-flex justify-content-center align-items-center text-center"
                    :style="{
                      backgroundColor: '#FF0000',
                      color: '#ffffff',
                    }"
                  >
                    <i class="pi pi-wallet" />
                  </span>
                </div>
              </template>
            </Card>
          </div>
          <div class="rent-payment-status-statistic-card">
            <Card class="flex-1">
              <template #content>
                <div class="flex justify-content-between gap-5">
                  <div class="flex flex-column gap-1">
                    <span class="text-secondary">{{ $t('dashboard.upcomingRent') }}</span>
                    <br />
                    <span class="font-bold text-lg">${{
                      new Intl.NumberFormat("en-US").format(
                        statistics.rentPaymentStatusStatistic
                          .upcomingStatisticElement.invoiceRevenue
                      )
                    }}</span>
                    <br />
                    <span class="opacity-50"
                      >{{
                        statistics.rentPaymentStatusStatistic
                          .upcomingStatisticElement.numberOfInvoice
                      }}
                      {{ $t('dashboard.upcoming') }}</span
                    >
                  </div>
                  <span
                    class="w-2rem h-2rem border-circle inline-flex justify-content-center align-items-center text-center"
                    :style="{
                      backgroundColor: '#3AA6B9',
                      color: '#ffffff',
                    }"
                  >
                    <i class="pi pi-wallet" />
                  </span>
                </div>
              </template>
            </Card>
          </div>
          <div class="rent-payment-status-statistic-card">
            <Card class="flex-1">
              <template #content>
                <div class="flex justify-content-between gap-5">
                  <div class="flex flex-column gap-1">
                    <span class="text-secondary"
                      >{{ $t('dashboard.leaseStatementPendingApproval') }}</span
                    >
                    <br />
                    <span class="font-bold text-lg">${{
                      new Intl.NumberFormat("en-US").format(
                        statistics.rentPaymentStatusStatistic
                          .pendingStatisticsElement.invoiceRevenue
                      )
                    }}</span>
                    <br />
                    <span class="opacity-50"
                      >{{
                        statistics.rentPaymentStatusStatistic
                          .pendingStatisticsElement.numberOfInvoice
                      }}
                      {{ $t('dashboard.pendingLeaseStatement') }}</span
                    >
                  </div>
                  <span
                    class="w-2rem h-2rem border-circle inline-flex justify-content-center align-items-center text-center"
                    :style="{
                      backgroundColor: '#FFC700',
                      color: '#ffffff',
                    }"
                  >
                    <i class="pi pi-wallet" />
                  </span>
                </div>
              </template>
            </Card>
          </div>
        </div>
        <div class="row">
          <div class="element">
            <Card class="flex-1" style="height: 500px">
              <template #content>
                <div class="flex justify-content-between gap-5">
                  <div class="flex flex-column gap-1">
                    <span class="font-bold text-lg"
                      >{{ $t('dashboard.rentalIncomeByMonth') }}</span
                    >
                    <br />
                    <br />
                    <Chart
                      type="bar"
                      :data="rentalIncomeData"
                      class="h-30rem"
                      style="width: 800px"
                    />
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </div>
        <div class="row">
          <div class="element">
            <div class="card flex justify-content-center">
              <Card>
                <template #content>
                  <div class="flex flex-column gap-1">
                    <span class="font-bold text-lg"
                      >{{ $t('dashboard.realEstateDistributionByCategory') }}</span
                    >
                  </div>
                  <br />
                  <br />
                  <Chart
                    type="doughnut"
                    :data="realEstateDistributionByCategoriesStatisticData"
                    class="w-full md:w-30rem"
                    style="height: 250px"
                  />
                </template>
              </Card>
            </div>
          </div>
          <div class="element">
            <div class="card flex justify-content-center">
              <Card style="width: 400px; height: 350px">
                <template #content>
                  <div class="flex flex-column gap-1">
                    <span class="font-bold text-lg"
                      >{{ $t('dashboard.occupancyRate') }}</span
                    >
                  </div>
                  <br />
                  <br />
                  <Knob
                    v-model="occupancyRate"
                    valueTemplate="{value}%"
                    readonly
                    :pt="{
                      svg: () => ({
                        class: 'occupany-knob',
                      }),
                    }"
                  />
                  <br />
                  <span class="opacity-50"
                    >{{ $t('dashboard.totalNumberOfRealEstate') }}:
                    {{ statistics.occupancyStatistic.realEstateCount }}
                  </span>
                  <br />
                  <br />
                  <span class="opacity-50"
                    >{{ $t('dashboard.totalNumerOfRentedRealEstate') }}:
                    {{ statistics.occupancyStatistic.occupancyCount }}
                  </span>
                </template>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </template>
  </ViewUsedByStaff>
</template>

<script>
import ViewUsedByStaff from "./base/ViewUsedByStaff.vue";
import { gysClient } from "@/assets/js/client.js";
import { canSeeComponent } from "@/service/RbacService";

export default {
  name: "DashboardStaffView",
  components: { ViewUsedByStaff },
  data() {
    return {
      isVisible: null,
      chartData: null,
      chartOptions: null,
      statistics: {
        rentPaymentStatusStatistic: {
          paidStatisticElement: {
            invoiceRevenue: null,
            numberOfInvoice: null,
          },
          unpaidStatisticElement: {
            invoiceRevenue: null,
            numberOfInvoice: null,
          },
          upcomingStatisticElement: {
            invoiceRevenue: null,
            numberOfInvoice: null,
          },
          pendingStatisticsElement: {
            invoiceRevenue: null,
            numberOfInvoice: null,
          },
        },
        rentalIncomeStatusStatistic: {
          monthlyStatisticElements: [],
        },
        realEstateDistributionByCategoriesStatistic: {
          statisticElements: [],
        },
        occupancyStatistic: {
          realEstateCount: null,
          occupancyCount: null,
        },
      },
      realEstateDistributionByCategoriesStatisticData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
          },
        ],
      },
      occupancyRate: 0,
      rentalIncomeData: {
        labels: [],
        datasets: [
            {
                label: this.$t('dashboard.rentData'),
                data: []
            }
        ]
      },
    };
  },
  methods: {
    getStatistics() {
      gysClient.get("dashboard").then((response) => {
        this.statistics = response.data;

        let labels = [];
        let data = [];
        let colors = [];

        response.data.realEstateDistributionByCategoriesStatistic.statisticElements.forEach(
          (element) => {
            labels.push(element.categoryName);
            data.push(element.numberOfRealEstate);

            // generate random color code

            var x = Math.round(0xffffff * Math.random()).toString(16);
            var y = 6 - x.length;
            var z = "000000";
            var z1 = z.substring(0, y);
            var color = "#" + z1 + x;

            colors.push(color);
          }
        );

        // real estate distribution by categories

        this.realEstateDistributionByCategoriesStatisticData.labels = labels;
        this.realEstateDistributionByCategoriesStatisticData.datasets.at(
          0
        ).data = data;
        this.realEstateDistributionByCategoriesStatisticData.datasets.at(
          0
        ).backgroundColor = colors;

        // occupancy

        var realEstateCountOccupancy =
          response.data.occupancyStatistic.realEstateCount;
        var occupantCount = response.data.occupancyStatistic.occupancyCount;

        this.occupancyRate = ((occupantCount / realEstateCountOccupancy) * 100).toFixed(2);

        // rental income

        var monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        var rentalIncomeLabels = [];
        var rentalIncomeData = [];

        for (var i = 1; i <= 12; i++) {
            var rentalIncomeDataElement = response.data.rentalIncomeStatistic.monthlyStatisticElements
                    .find((element) => element.month === i.toString());

            rentalIncomeLabels.push(monthNamesShort[i - 1]);

            if (!rentalIncomeDataElement) {
                rentalIncomeData.push(0);
            } 
            else {
                rentalIncomeData.push(rentalIncomeDataElement.revenue);
            }
        }

        this.rentalIncomeData.labels = rentalIncomeLabels;
        this.rentalIncomeData.datasets[0].data = rentalIncomeData;
      });
    },
    setChartData() {
      const documentStyle = getComputedStyle(document.documentElement);

      return {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "My First dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
          },
          {
            label: "My Second dataset",
            backgroundColor: documentStyle.getPropertyValue("--gray-500"),
            borderColor: documentStyle.getPropertyValue("--gray-500"),
            data: [28, 48, 40, 19, 86, 27, 90],
          },
        ],
      };
    },
  },
  mounted() {
    canSeeComponent(this.$options.name).then(
      (response) => (this.isVisible = response.data)
    );

    // this.chartData = this.setChartData();
    this.getStatistics();
  },
};
</script>

<style>
.dashboard-staff-container .row {
  display: flex;
  margin-top: 30px;
  padding: 0px 50px;
}

.dashboard-staff-container .row .rent-payment-status-statistic-card {
  width: 30%;
  padding: 20px;
}

.dashboard-staff-container .row .element {
  padding: 0px 20px;
}

.dashboard-staff-container .row .element .occupany-knob {
  width: 105px;
  height: 105px;
}
</style>